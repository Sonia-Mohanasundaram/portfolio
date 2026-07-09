import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Download, Rocket, Mail, Sparkles } from "lucide-react";
import avatar from "@/assets/Sonia new passport size.jpg";
import { portfolio } from "@/config/portfolio";

const ORBIT_ICONS = ["Python", "Java", "React", "JS", "TF", "FastAPI", "Mongo", "GitHub", "OpenCV", "AI", "LLM"];

export function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [deleting, setDeleting] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const current = portfolio.roles[roleIdx];
    const speed = deleting ? 40 : 80;
    const t = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, typed.length + 1);
        setTyped(next);
        if (next === current) setTimeout(() => setDeleting(true), 1400);
      } else {
        const next = current.slice(0, typed.length - 1);
        setTyped(next);
        if (next === "") {
          setDeleting(false);
          setRoleIdx((i) => (i + 1) % portfolio.roles.length);
        }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [typed, deleting, roleIdx]);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty("--rx", `${(-y * 12).toFixed(2)}deg`);
      el.style.setProperty("--ry", `${(x * 12).toFixed(2)}deg`);
    };
    const reset = () => {
      el.style.setProperty("--rx", `0deg`);
      el.style.setProperty("--ry", `0deg`);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", reset);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", reset);
    };
  }, []);

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-4 pt-20 pb-12 sm:pt-24 sm:pb-16">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-14">
        {/* Left: text */}
        <div className="order-2 md:order-1">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-cyan-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
            </span>
            System online • Available for opportunities
          </motion.div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
            className="text-lg text-white/70">
            Hello <span className="inline-block animate-float">👋</span> I'm
          </motion.p>

          <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="font-display text-5xl leading-[0.92] tracking-tight text-gradient animate-gradient sm:text-6xl md:text-8xl font-black"
            style={{ backgroundImage: "linear-gradient(90deg, #EC4899, #7C3AED, #3B82F6, #06B6D4)" }}>
            SONIA M
          </motion.h1>

          <div className="mt-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-cyan-400" />
            <span className="font-mono text-base text-white sm:text-xl md:text-2xl">
              {typed}
              <span className="ml-0.5 inline-block h-6 w-[3px] bg-cyan-400 align-middle" style={{ animation: "typing-caret 1s infinite" }} />
            </span>
          </div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="mt-6 max-w-xl text-sm text-white/75 sm:text-base md:text-lg">
            {portfolio.intro}
          </motion.p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button onClick={() => go("about")} className="magnetic-btn group relative overflow-hidden rounded-full px-6 py-3 font-mono text-sm font-semibold uppercase tracking-widest text-white transition-transform hover:scale-[1.03]"
              style={{ background: "linear-gradient(135deg, #7C3AED, #06B6D4)", boxShadow: "var(--glow-purple)" }}>
              <Rocket className="mr-2 inline h-4 w-4" />Explore My Universe
            </button>
            <a href={portfolio.resumeUrl} download className="rounded-full glass-strong px-6 py-3 font-mono text-sm font-semibold uppercase tracking-widest text-white transition-transform hover:scale-[1.03] hover:glow-cyan"
               onClick={() => window.dispatchEvent(new CustomEvent("confetti-blast"))}>
              <Download className="mr-2 inline h-4 w-4" />Download Resume
            </a>
            <button onClick={() => go("contact")} className="rounded-full px-6 py-3 font-mono text-sm font-semibold uppercase tracking-widest text-white transition-transform hover:scale-[1.03]"
              style={{ background: "linear-gradient(135deg, #EC4899, #7C3AED)", boxShadow: "var(--glow-pink)" }}>
              Hire Me
            </button>
            <button onClick={() => go("contact")} className="rounded-full glass px-6 py-3 font-mono text-sm font-semibold uppercase tracking-widest text-white transition-transform hover:scale-[1.03]">
              <Mail className="mr-2 inline h-4 w-4" />Contact
            </button>
          </div>
        </div>

        {/* Right: holographic avatar */}
        <div className="order-1 flex justify-center md:order-2">
          <div ref={cardRef} className="relative h-[clamp(260px,78vw,440px)] w-[clamp(260px,78vw,440px)]"
               style={{ perspective: "1200px" }}>
            {/* Orbiting rings */}
            <div className="absolute inset-0 animate-spin-slow" style={{ transform: "rotateX(70deg)" }}>
              <div className="absolute inset-0 rounded-full border border-cyan-400/40" />
            </div>
            <div className="absolute inset-6 animate-spin-medium" style={{ transform: "rotateX(70deg) rotate(30deg)" }}>
              <div className="absolute inset-0 rounded-full border border-purple-400/40" />
            </div>

            {/* Orbiting tech chips */}
            <div className="absolute inset-0 hidden animate-spin-slow sm:block">
              {ORBIT_ICONS.map((label, i) => {
                const angle = (i / ORBIT_ICONS.length) * Math.PI * 2;
                const r = 210;
                const x = Math.cos(angle) * r;
                const y = Math.sin(angle) * r;
                return (
                  <div key={label}
                       className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg glass px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-cyan-200"
                       style={{ transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`, boxShadow: "0 0 12px rgba(6,182,212,0.4)" }}>
                    {label}
                  </div>
                );
              })}
            </div>

            {/* Holographic photo */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute left-1/2 top-1/2 aurora-border scanline overflow-hidden rounded-full"
              style={{
                width: "clamp(210px, 58vw, 260px)",
                height: "clamp(210px, 58vw, 260px)",
                transform: "translate(-50%, -50%) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))",
                transformStyle: "preserve-3d",
                boxShadow: "0 0 60px rgba(124,58,237,0.6), inset 0 0 40px rgba(6,182,212,0.3)",
                background: "var(--gradient-primary)",
              }}
            >
              <img
                src={avatar}
                alt={portfolio.name}
                width={520}
                height={520}
                className="h-full w-full object-cover"
                style={{ objectPosition: "50% 20%" }}
              />
              <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, rgba(5,8,22,0.55) 100%)" }} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}