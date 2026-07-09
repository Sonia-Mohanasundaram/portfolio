import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { SectionTitle } from "./About";

type Planet = { name: string; color: string; size: number; ring: string; items: string[] };

const PLANETS: Planet[] = [
  { name: "Programming", color: "#7C3AED", size: 140, ring: "#EC4899", items: ["Java", "Python(Basics)",] },
  { name: "Frontend", color: "#06B6D4", size: 130, ring: "#3B82F6", items: ["HTML", "CSS", "React", "Tailwind CSS"] },
  { name: "Backend", color: "#3B82F6", size: 120, ring: "#7C3AED", items: ["Flask", "FastAPI", "REST API"] },
  { name: "Databases", color: "#EC4899", size: 110, ring: "#06B6D4", items: ["MongoDB(Atlas & Compass)", "PostgreSQL"] },
  { name: "Dev Tools", color: "#8b5cf6", size: 150, ring: "#22d3ee", items: ["Git", "GitHub", "VS Code", "Antigravity", "Google Colab", "Jupyter Notebook", "PowerPoint", "Word", "Excel"] },
  { name: "AI", color: "#22d3ee", size: 160, ring: "#EC4899", items: ["TensorFlow", "OpenCV", "Scikit Learn", "CNN", "Transfer Learning", "LLMs", "Whisper", "Ollama", "spaCy"] },
  { name: "AI Tools", color: "#f472b6", size: 140, ring: "#7C3AED", items: ["ChatGPT", "Claude", "GitHub Copilot", "Lovable", "Firebase", "Supabase", "n8n", "Base44", "Figma", "Canva","and always searching to hunt the current AI tools"] },
];

export function Skills() {
  const [open, setOpen] = useState<Planet | null>(null);
  return (
    <section id="skills" className="relative px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow="// 02 CAPABILITIES" title="Skill Galaxy" />
        <p className="mx-auto -mt-6 mb-12 max-w-2xl text-center text-white/60">
          Click a planet to inspect its stack.
        </p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 place-items-center">
          {PLANETS.map((p, i) => (
            <motion.button
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, type: "spring" }}
              whileHover={{ scale: 1.08 }}
              onClick={() => setOpen(p)}
              className="group relative flex flex-col items-center gap-3"
            >
              <div className="relative animate-float" style={{ animationDelay: `${i * 0.4}s` }}>
                <div
                  className="rounded-full"
                  style={{
                    width: `clamp(100px, 28vw, ${p.size}px)`,
                    height: `clamp(100px, 28vw, ${p.size}px)`,
                    background: `radial-gradient(circle at 30% 30%, #fff2, transparent 40%), radial-gradient(circle at 70% 70%, ${p.color}, #0a0a2e 70%)`,
                    boxShadow: `0 0 40px ${p.color}80, inset -10px -20px 40px #000a`,
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center rounded-full">
                  <div className="animate-spin-slow rounded-full" style={{ width: `calc(clamp(100px, 28vw, ${p.size}px) + 30px)`, height: `calc(clamp(100px, 28vw, ${p.size}px) + 30px)`, border: `1px dashed ${p.ring}80`, transform: "rotateX(72deg)" }} />
                </div>
                <div className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
                     style={{ boxShadow: `0 0 60px ${p.ring}` }} />
              </div>
              <div className="font-display text-[11px] font-bold tracking-wider text-white sm:text-sm">{p.name}</div>
              <div className="font-mono text-[10px] uppercase text-white/50">{p.items.length} techs</div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] grid place-items-center bg-black/70 backdrop-blur-md p-4"
            onClick={() => setOpen(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="aurora-border glass-strong relative w-full max-w-lg rounded-3xl p-8"
              style={{ boxShadow: `0 0 60px ${open.color}90` }}
            >
              <button onClick={() => setOpen(null)} className="absolute right-4 top-4 rounded-full glass p-2 text-white/80 hover:text-white">
                <X className="h-4 w-4" />
              </button>
              <div className="flex items-center gap-4">
                <div className="rounded-full" style={{ width: 60, height: 60, background: `radial-gradient(circle at 30% 30%, #fff4, ${open.color})`, boxShadow: `0 0 30px ${open.color}` }} />
                <div>
                  <div className="font-mono text-xs uppercase tracking-widest text-cyan-300">Planet</div>
                  <div className="font-display text-2xl font-black text-white">{open.name}</div>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {open.items.map((t) => (
                  <span key={t} className="rounded-full glass px-3 py-1.5 font-mono text-xs tracking-wide text-white/90"
                        style={{ boxShadow: `0 0 10px ${open.ring}44` }}>
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}