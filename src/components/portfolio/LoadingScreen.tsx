import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = [
  "INITIALIZING SONIA M OS...",
  "Loading Neural Network...",
  "Connecting AI Modules...",
  "Loading Projects...",
  "Loading Skills...",
  "Preparing Portfolio...",
  "Welcome Sonia...",
];

export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const total = 3200;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / total);
      setProgress(p);
      const s = Math.min(STEPS.length - 1, Math.floor(p * STEPS.length));
      setStep(s);
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setDone(true);
        setTimeout(onDone, 500);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0, scale: 1.05, filter: "blur(20px)" }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: "radial-gradient(ellipse at center, #0a0a2e, #050816 70%, #000)" }}
        >
          <div className="grid-bg absolute inset-0 opacity-30" />
          <div className="relative flex flex-col items-center gap-8 px-6 text-center">
            {/* Orbiting rings */}
            <div className="relative h-40 w-40">
              <div className="absolute inset-0 rounded-full border-2 border-transparent animate-spin-slow"
                   style={{ borderTopColor: "#7C3AED", borderRightColor: "#06B6D4" }} />
              <div className="absolute inset-3 rounded-full border-2 border-transparent"
                   style={{ borderTopColor: "#EC4899", borderLeftColor: "#3B82F6", animation: "spin-slow 4s linear infinite reverse" }} />
              <div className="absolute inset-8 rounded-full animate-pulse-glow"
                   style={{ background: "var(--gradient-primary)" }} />
              <div className="absolute inset-0 flex items-center justify-center font-display text-2xl font-black text-white"
                   style={{ textShadow: "0 0 20px #7C3AED" }}>SM</div>
            </div>

            <div className="font-display text-3xl md:text-5xl font-bold tracking-widest text-gradient animate-gradient"
                 style={{ backgroundImage: "var(--gradient-primary)" }}>
              SONIA OS
            </div>

            <div className="h-6 min-w-[280px]">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-mono text-sm text-cyan-300"
              >
                {STEPS[step]}
                <span className="ml-1 inline-block h-3 w-1.5 bg-cyan-300 align-middle" style={{ animation: "typing-caret 1s infinite" }} />
              </motion.div>
            </div>

            <div className="relative h-1 w-[300px] overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full"
                style={{ background: "linear-gradient(90deg, #7C3AED, #06B6D4, #EC4899)", width: `${progress * 100}%` }}
              />
            </div>
            <div className="font-mono text-xs text-white/60">{Math.round(progress * 100)}% • v1.0.0</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}