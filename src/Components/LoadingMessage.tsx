import { Bot } from "lucide-react";

export const LoadingMessage = () => {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
        <Bot className="w-5 h-5 text-white" />
      </div>

      <div className="flex-1 max-w-3xl">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3 shadow-lg">
          <div className="text-sm font-medium mb-1 opacity-80">Assistant</div>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-white/60 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-2 h-2 bg-white/60 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
            <span className="text-sm text-white/60">Sedang mengetik...</span>
          </div>
        </div>
      </div>
    </div>
  );
};
