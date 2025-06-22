"use client";

import { cn } from "@/lib/utils";
import { Bot, User, Copy, Check } from "lucide-react";
import { useState } from "react";

interface MessageProps {
  content: string;
  isUserMessage: boolean;
}

export const Message = ({ content, isUserMessage }: MessageProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn("flex gap-4 group", {
        "flex-row-reverse": isUserMessage,
      })}
    >
      {/* Avatar */}
      <div
        className={cn(
          "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-lg",
          {
            "bg-gradient-to-r from-blue-500 to-purple-600": isUserMessage,
            "bg-gradient-to-r from-emerald-500 to-teal-600": !isUserMessage,
          }
        )}
      >
        {isUserMessage ? (
          <User className="w-5 h-5 text-white" />
        ) : (
          <Bot className="w-5 h-5 text-white" />
        )}
      </div>

      {/* Message Content */}
      <div
        className={cn("flex-1 max-w-3xl", {
          "flex justify-end": isUserMessage,
        })}
      >
        <div
          className={cn(
            "relative px-4 py-3 rounded-2xl shadow-lg backdrop-blur-sm border transition-all duration-200 hover:shadow-xl",
            {
              "bg-white/10 text-white border-blue-400/30":
                isUserMessage,
              "bg-white/10 text-white border-white/20 hover:bg-white/15":
                !isUserMessage,
            }
          )}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <div className="text-sm font-medium mb-1 opacity-80">
                {isUserMessage ? "Anda" : "Assistant"}
              </div>
              <div className="text-sm leading-relaxed whitespace-pre-wrap">
                {content}
              </div>
            </div>

            {!isUserMessage && (
              <button
                onClick={handleCopy}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 hover:bg-white/10 rounded"
                title="Salin pesan"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-300" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
