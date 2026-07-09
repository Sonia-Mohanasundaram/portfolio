import { motion } from "framer-motion";
import { Cpu, Code2, Rocket, Brain, Zap, Palette } from "lucide-react";

const TRAITS = [
  { Icon: Cpu, label: "CS Engineering Student" },
  { Icon: Brain, label: "AI Software Developer" },
  { Icon: Code2, label: "Frontend Developer" },
  { Icon: Rocket, label: "Hackathon Enthusiast" },
  { Icon: Zap, label: "Fast Learner" },
  { Icon: Palette, label: "Creative Thinker" },
];

export function About() {
  return (
    <section id="about" className="relative px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="// 01 IDENTITY" title="About Me" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="aurora-border animate-float glass-strong relative overflow-hidden rounded-3xl p-8 md:p-12"
               style={{ boxShadow: "0 30px 80px -30px rgba(124,58,237,0.6)" }}>
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full blur-3xl" style={{ background: "radial-gradient(#7C3AED, transparent 70%)" }} />
            <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full blur-3xl" style={{ background: "radial-gradient(#06B6D4, transparent 70%)" }} />
            <div className="relative grid gap-8 md:grid-cols-[1fr_1.4fr]">
              <div className="space-y-3">
                {TRAITS.map(({ Icon, label }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-center gap-3 rounded-xl glass px-4 py-2.5"
                  >
                    <div className="grid h-9 w-9 place-items-center rounded-lg" style={{ background: "linear-gradient(135deg, #7C3AED, #06B6D4)", boxShadow: "0 0 20px rgba(124,58,237,0.6)" }}>
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-mono text-sm tracking-wide text-white/90">{label}</span>
                  </motion.div>
                ))}
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="font-display text-2xl md:text-3xl font-bold text-white">
                  Building the future — one line of code at a time.
                </h3>
                <p className="mt-4 text-white/75 leading-relaxed">
                  Passionate about creating intelligent software using Artificial Intelligence
                  and modern web technologies. I love the intersection of machine learning,
                  clean interfaces, and human curiosity — turning research into products people
                  actually love to use.
                </p>
                <div className="mt-6 grid grid-cols-3 gap-3">
                  <Stat n="8+" label="Projects" />
                  <Stat n="4" label="Hackathons" />
                  <Stat n="13+" label="Certifications along with College Tech events" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className="rounded-xl glass px-3 py-3 text-center">
      <div className="font-display text-2xl font-black text-gradient" style={{ backgroundImage: "linear-gradient(135deg,#EC4899,#06B6D4)" }}>{n}</div>
      <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-white/60">{label}</div>
    </div>
  );
}

export function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-10 text-center">
      <div className="font-mono text-xs uppercase tracking-[0.4em] text-cyan-300/80">{eyebrow}</div>
      <h2 className="mt-2 font-display text-4xl md:text-5xl font-black text-gradient" style={{ backgroundImage: "linear-gradient(90deg,#EC4899,#7C3AED,#06B6D4)" }}>
        {title}
      </h2>
      <div className="mx-auto mt-3 h-[2px] w-24 rounded-full" style={{ background: "linear-gradient(90deg, transparent, #7C3AED, #06B6D4, transparent)" }} />
    </div>
  );
}