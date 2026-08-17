import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_PREFIXES = ["/data/", "/games/"];

const SITE_HOST = (process.env.NEXT_PUBLIC_SITE_URL || "")
  .replace(/^https?:\/\//, "")
  .split("/")[0]
  .split(":")[0]
  .toLowerCase();

const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "::1"]);

function isHotlink(request: NextRequest): boolean {
  const referer = request.headers.get("referer");
  if (!referer) return false;

  let refHostname: string;
  try {
    refHostname = new URL(referer).hostname.toLowerCase();
  } catch {
    return false;
  }

  if (refHostname === SITE_HOST || LOCAL_HOSTS.has(refHostname)) return false;

  const hostHeader = (request.headers.get("host") || "")
    .split(":")[0]
    .toLowerCase();
  return refHostname !== hostHeader;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!PROTECTED_PREFIXES.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  if (request.method !== "GET" && request.method !== "HEAD") {
    return NextResponse.next();
  }

  if (isHotlink(request)) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/data/:path*", "/games/:path*"],
};
