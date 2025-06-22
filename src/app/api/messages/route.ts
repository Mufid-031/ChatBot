import { ragChat } from "@/lib/rag-chat";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("sessionId");

  if (!sessionId) {
    return new Response("Missing sessionId", { status: 400 });
  }

  const messages = (
    await ragChat.history.getMessages({
      amount: 10,
      sessionId,
    })
  ).reverse();

  return new Response(JSON.stringify(messages), {
    headers: { "Content-Type": "application/json" },
  });
}
