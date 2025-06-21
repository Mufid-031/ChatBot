import GooeyNav from "@/Components/GooeyNav/GooeyNav";
import { ZapIcon } from "lucide-react";

const items = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Bot", href: "#bot" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 py-5 px-2 flex justify-between items-center bg-black overflow-hidden">
      <h1 className="text-2xl font-bold text-white ml-5 flex items-center gap-2">
        <div className="relative w-5 h-5">
          {/* Ikon versi normal (kosong) */}
          <ZapIcon fill="currentColor" />
        </div>
        ChatBot
      </h1>

      <GooeyNav
        items={items}
        particleCount={15}
        particleDistances={[90, 10]}
        particleR={100}
        animationTime={600}
        timeVariance={300}
        colors={[1, 2, 3, 1, 2, 3, 1, 4]}
        initialActiveIndex={0}
      />
    </header>
  );
}
