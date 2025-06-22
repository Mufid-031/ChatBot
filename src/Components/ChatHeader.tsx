import { Globe, Sparkles } from "lucide-react";

interface ChatHeaderProps {
  websiteUrl: string;
}

export const ChatHeader = ({ websiteUrl }: ChatHeaderProps) => {
  const displayUrl =
    websiteUrl.length > 50 ? `${websiteUrl.substring(0, 47)}...` : websiteUrl;

  return (
    <div className="p-6 pb-0">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-muted rounded-xl">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Chat dengan Website</h1>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <Globe className="w-4 h-4" />
            <span className="truncate">{displayUrl}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
