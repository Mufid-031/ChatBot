import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { messages, sessionId } = await req.json();

    const lastMessage = messages[messages.length - 1]?.content ?? "Halo";

    const togetherResponse = await fetch(
      "https://api.together.xyz/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: lastMessage },
          ],
        }),
      }
    );

    const data = await togetherResponse.json();

    console.log("Together API Response:", data);

    const content =
      data?.choices?.[0]?.message?.content ??
      "⚠️ (No valid response from model)";

    return new Response(
      JSON.stringify({
        role: "assistant",
        content,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error handling chat-stream request:", error);

    return new Response(
      JSON.stringify({
        role: "assistant",
        content: "⚠️ Terjadi kesalahan saat memproses permintaan.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
