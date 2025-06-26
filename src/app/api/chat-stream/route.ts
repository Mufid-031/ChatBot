/* eslint-disable @typescript-eslint/no-unused-vars */
import { getLangChain } from "@/lib/langchain";
import { fetchVectorFromUpstash } from "@/lib/vector";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic"; // agar route selalu dieksekusi ulang

export const POST = async (req: NextRequest) => {
  const { messages, sessionId } = await req.json();
  const lastMessage = messages[messages.length - 1]?.content ?? "Halo";

  const documents = await fetchVectorFromUpstash(sessionId);
  const retriever = {
    getRelevantDocuments: async () => documents,
  };

  const { chain, redis } = await getLangChain({
    sessionId,
    retriever,
  });

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        // Simpan pesan user
        await redis.rpush(
          sessionId,
          JSON.stringify({ role: "user", content: lastMessage })
        );

        // Stream result via chain (jika chain support streaming)
        let assistantReply = "";

        const response = await chain.call({
          query: lastMessage,
        });

        assistantReply = response?.text ?? "Tidak ada jawaban.";

        // Simpan response assistant
        await redis.rpush(
          sessionId,
          JSON.stringify({ role: "assistant", content: assistantReply })
        );

        // Kirim sebagai SSE
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({
              role: "assistant",
              content: assistantReply,
            })}\n\n`
          )
        );

        controller.close();
      } catch (err) {
        controller.enqueue(
          encoder.encode("event: error\ndata: Terjadi kesalahan\n\n")
        );
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
};
