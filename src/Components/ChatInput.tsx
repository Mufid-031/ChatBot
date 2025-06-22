"use client";

import { Send, Loader2 } from "lucide-react";
import type { useChat } from "ai/react";

type HandleInputChange = ReturnType<typeof useChat>["handleInputChange"];
type HandleSubmit = ReturnType<typeof useChat>["handleSubmit"];
type SetInput = ReturnType<typeof useChat>["setInput"];

interface ChatInputProps {
  input: string;
  handleInputChange: HandleInputChange;
  handleSubmit: HandleSubmit;
  setInput: SetInput;
  isLoading?: boolean;
}

export const ChatInput = ({
  handleInputChange,
  handleSubmit,
  input,
  setInput,
  isLoading,
}: ChatInputProps) => {
  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="flex items-end gap-3">
        <div className="flex-1 relative">
          <textarea
            className="w-full px-4 py-3 pr-12 rounded-2xl bg-white/10 backdrop-blur-sm text-white placeholder:text-gray-400 outline-none border border-white/20 focus:border-blue-400/50 focus:bg-white/15 transition-all duration-200 resize-none min-h-[52px] max-h-32"
            placeholder="Tanyakan sesuatu tentang website ini..."
            value={input}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (input.trim() && !isLoading) {
                  handleSubmit();
                  setInput("");
                }
              }
            }}
            rows={1}
            style={{
              height: "auto",
              minHeight: "52px",
            }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = "auto";
              target.style.height = Math.min(target.scrollHeight, 128) + "px";
            }}
          />

          <div className="absolute right-3 bottom-3 text-xs text-gray-400">
            {input.length > 0 && (
              <span className="opacity-60">{input.length}/1000</span>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed rounded-2xl text-white transition-all duration-200 shadow-lg hover:shadow-xl disabled:shadow-none flex items-center justify-center min-w-[52px]"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </button>
      </form>

      <div className="mt-2 text-xs text-gray-400 text-center">
        Tekan Enter untuk mengirim, Shift+Enter untuk baris baru
      </div>
    </div>
  );
};
