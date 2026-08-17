import { NextResponse } from "next/server";
import { getComments, addComment, COMMENT_LIMIT } from "@/lib/comments";

export const dynamic = "force-dynamic";

const RATE_LIMIT_MS = 60_000;
const RATE_MAX = 5;
const recentPosts = new Map<string, number[]>();

export async function GET(_request: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  const comments = await getComments(slug, COMMENT_LIMIT);
  return NextResponse.json({ comments });
}

export async function POST(request: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const now = Date.now();
  const hits = (recentPosts.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_MS);
  if (hits.length >= RATE_MAX) {
    return NextResponse.json(
      { error: "Too many comments from you. Please wait a minute." },
      { status: 429 }
    );
  }

  let body: { name?: string; content?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const result = await addComment(slug, body?.name ?? "", body?.content ?? "");
  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  hits.push(now);
  recentPosts.set(ip, hits);
  return NextResponse.json({ comment: result.comment }, { status: 201 });
}
