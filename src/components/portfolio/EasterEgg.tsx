import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function EasterEgg() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let buffer = "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key.length !== 1) return;
      buffer = (buffer + e.key.toLowerCase()).slice(-10);
      if (buffer.endsWith("sonia")) {
        setShow(true);
        setTimeout(() => setShow(false), 3200);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.4 }}
          className="pointer-events-none fixed inset-0 z-[90] grid place-items-center"
        >
          <div className="text-center">
            <div className="font-display text-6xl md:text-8xl font-black text-gradient animate-gradient"
                 style={{ backgroundImage: "linear-gradient(90deg,#EC4899,#7C3AED,#06B6D4,#EC4899)" }}>
              SONIA MODE ✨
            </div>
            <div className="mt-3 font-mono text-sm uppercase tracking-[0.4em] text-cyan-300">Hidden protocol engaged</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}