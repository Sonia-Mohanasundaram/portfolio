import { useEffect, useState } from "react";
import { Rocket } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed right-5 top-24 z-40 grid h-11 w-11 place-items-center rounded-full"
          style={{ background: "linear-gradient(135deg,#3B82F6,#06B6D4)", boxShadow: "var(--glow-cyan)" }}
          aria-label="Back to top"
        >
          <Rocket className="h-5 w-5 -rotate-45 text-white" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}