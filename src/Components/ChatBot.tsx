"use client";

import { useState, useRef, useEffect } from "react";
import { SendHorizonal } from "lucide-react";
import clsx from "clsx";

interface Message {
  role: "user" | "bot";
  content: string;
}

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulasi loading dan respon bot
    setTimeout(() => {
      const botMessage = {
        role: "bot",
        content: `Saya adalah chatbot IR, dan saya menerima: "${input}"`,
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <div className="w-full max-w-6xl h-[500px] mx-auto bg-zinc-900 rounded-2xl shadow-xl flex flex-col overflow-hidden border border-white/10">
      <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scroll">
        {messages.length === 0 ? (
          <p className="text-muted-foreground text-sm text-center mt-10">
            Tanyakan apapun terkait Information Retrieval.
          </p>
        ) : (
          messages.map((msg, i) => (
            <div
              key={i}
              className={clsx(
                "max-w-[75%] px-4 py-2 rounded-xl text-sm whitespace-pre-wrap",
                msg.role === "user"
                  ? "bg-blue-600 ml-auto text-white"
                  : "bg-zinc-800 text-gray-100"
              )}
            >
              {msg.content}
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>

      <div className="border-t border-white/10 p-4 bg-zinc-950 flex items-center gap-2">
        <input
          className="flex-1 px-4 py-2 rounded-lg bg-zinc-800 text-white placeholder:text-gray-400 outline-none border border-white/10"
          placeholder="Tanyakan sesuatu..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />
        <button
          onClick={sendMessage}
          className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full text-white"
        >
          <SendHorizonal size={18} />
        </button>
      </div>
    </div>
  );
}
