"use client";

import { type Message, useChat } from "@ai-sdk/react";
import { Messages } from "./Messages";
import { ChatInput } from "./ChatInput";

export const ChatWrapper = ({
  sessionId,
  initialMessages,
}: {
  sessionId: string;
  initialMessages: Message[];
}) => {
  const {
    messages,
    handleInputChange,
    handleSubmit,
    input,
    setInput,
    isLoading,
  } = useChat({
    api: "/api/chat-stream",
    body: { sessionId },
    initialMessages,
  });

  return (
    <div className="flex flex-col h-full max-w-7xl mx-auto">
      <div className="flex-1 flex flex-col bg-white/5 backdrop-blur-xl border border-white/10 rounded-t-2xl shadow-2xl overflow-hidden w-[40rem]">
        <div className="flex-1 overflow-hidden">
          <Messages messages={messages} isLoading={isLoading} />
        </div>

        <ChatInput
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          setInput={setInput}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};
