import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? null;
  const admin = await isAdminRequest(token);
  return NextResponse.json({ admin });
}
