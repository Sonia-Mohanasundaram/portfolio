import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 px-4 py-10 text-center">
      <div className="font-mono text-sm text-white/80">
        Designed &amp; Developed with <Heart className="mx-1 inline h-4 w-4 fill-pink-500 text-pink-500" /> by Sonia M
      </div>
      <div className="mt-2 font-mono text-xs text-white/50">© 2026 Sonia M. All rights reserved.</div>
    </footer>
  );
}