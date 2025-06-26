"use client";

import { useState } from "react";
import { Messages } from "./Messages";
import { ChatInput } from "./ChatInput";

export const ChatWrapper = ({ sessionId, initialMessages }: any) => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!input.trim()) return;

    const newUserMessage = { role: "user", content: input };
    setMessages((prev: any) => [...prev, newUserMessage]);
    setInput("");
    setIsLoading(true);

    const res = await fetch("/api/chat-stream", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [...messages, newUserMessage],
        sessionId,
      }),
    });

    if (!res.ok || !res.body) {
      setMessages((prev: any) => [
        ...prev,
        { role: "assistant", content: "⚠️ Gagal menerima stream." },
      ]);
      setIsLoading(false);
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let fullText = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });

      // Parse hanya bagian "data: ..."
      const match = chunk.match(/^data: (.+)$/m);
      if (match) {
        try {
          const parsed = JSON.parse(match[1]);
          fullText += parsed.content;
          setMessages((prev: any) => [
            ...prev.slice(0, -1),
            { role: "assistant", content: fullText },
          ]);
        } catch (err) {
          console.error("Parse error:", err);
        }
      }
    }

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full max-w-7xl mx-auto">
      <div className="flex-1 flex flex-col bg-white/5 backdrop-blur-xl border border-white/10 rounded-t-2xl shadow-2xl overflow-hidden w-[40rem]">
        <div className="flex-1 overflow-hidden">
          <Messages messages={messages} isLoading={isLoading} />
        </div>
        <ChatInput
          input={input}
          setInput={setInput}
          handleInputChange={(e) => setInput(e.target.value)}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};
