import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin";
import { getRecentComments, deleteComment } from "@/lib/comments";

export const dynamic = "force-dynamic";

function adminToken(request: Request): string | null {
  return request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? null;
}

export async function GET(request: Request) {
  const token = adminToken(request);
  if (!(await isAdminRequest(token))) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }
  const comments = await getRecentComments(100);
  return NextResponse.json({ comments });
}

export async function DELETE(request: Request) {
  const token = adminToken(request);
  if (!(await isAdminRequest(token))) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }
  const id = new URL(request.url).searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing comment id." }, { status: 400 });
  }
  const result = await deleteComment(id, token ?? "");
  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
