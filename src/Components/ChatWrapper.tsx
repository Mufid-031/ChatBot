"use client";

import { type Message, useChat } from "@ai-sdk/react";
import { Messages } from "./Messages";
import { ChatInput } from "./ChatInput";
import { useEffect } from "react";

export const ChatWrapper = ({
  sessionId,
  initialMessages,
  websiteUrl,
}: {
  sessionId: string;
  initialMessages: Message[];
  websiteUrl: string;
}) => {
  const {
    messages,
    setMessages,
    handleInputChange,
    handleSubmit,
    input,
    setInput,
    isLoading,
    status,
  } = useChat({
    api: "/api/chat-stream",
    body: { sessionId },
    initialMessages,
  });

  // console.log(sessionId);

  // useEffect(() => {
  //   const updateMessages = async () => {
  //     try {
  //       const res = await fetch(`/api/messages?sessionId=${sessionId}`);
  //       if (!res.ok) {
  //         const text = await res.text();
  //         console.error("Failed to load messages:", res.status, text);
  //         return;
  //       }

  //       const data = await res.json();
  //       setMessages(data);
  //     } catch (err) {
  //       console.error("Error parsing JSON from /api/messages:", err);
  //     }
  //   };

  //   if (status === "streaming") {
  //     updateMessages();
  //   }
  // }, [status]);


  return (
    <div className="flex flex-col h-full max-w-7xl mx-auto">
      {/* <ChatHeader websiteUrl={websiteUrl} /> */}

      <div className="flex-1 flex flex-col bg-white/5 backdrop-blur-xl border border-white/10 rounded-t-2xl shadow-2xl overflow-hidden">
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
