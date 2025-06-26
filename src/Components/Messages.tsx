import type { Message as TMessage } from "@ai-sdk/react";
import { Message } from "./Message";
import { MessageSquare } from "lucide-react";
import { LoadingMessage } from "./LoadingMessage";

interface MessagesProps {
  messages: TMessage[];
  isLoading?: boolean;
}

export const Messages = ({ messages, isLoading }: MessagesProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.length ? (
          <>
            {messages.map((message, i) => (
              <Message
                key={i}
                content={message.content}
                isUserMessage={message.role === "user"}
              />
            ))}
            {isLoading && <LoadingMessage />}
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center gap-6 text-center px-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-xl opacity-30 animate-pulse"></div>
              <div className="relative p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white">
                Siap untuk membantu!
              </h3>
              <p className="text-gray-300 max-w-md">
                Tanyakan apa saja tentang konten website ini. Saya akan membantu
                Anda menemukan informasi yang Anda butuhkan.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              <div className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300 border border-white/20">
                💡 Tanya tentang konten
              </div>
              <div className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300 border border-white/20">
                🔍 Cari informasi spesifik
              </div>
              <div className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300 border border-white/20">
                📝 Minta ringkasan
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
