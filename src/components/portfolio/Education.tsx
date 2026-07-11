import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { SectionTitle } from "./About";

export function Education() {
  return (
    <section id="education" className="relative px-3 sm:px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <SectionTitle eyebrow="// 06 KNOWLEDGE" title="Education" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="aurora-border glass-strong relative overflow-hidden rounded-3xl p-8"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl"
               style={{ background: "radial-gradient(#06B6D4, transparent 70%)" }} />
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
            <div className="grid h-20 w-20 place-items-center rounded-2xl"
                 style={{ background: "linear-gradient(135deg,#7C3AED,#06B6D4)", boxShadow: "0 0 30px rgba(124,58,237,0.6)" }}>
              <GraduationCap className="h-10 w-10 text-white" />
            </div>
            <div className="flex-1">
              <div className="font-mono text-xs uppercase tracking-widest text-cyan-300">Institution</div>
              <h3 className="font-display text-2xl font-black text-white">Nandha Engineering College</h3>
              <p className="mt-1 text-white/80">B.E. Computer Science Engineering</p>
              <div className="mt-4 inline-flex items-center gap-3 rounded-full glass px-4 py-2">
                <span className="font-mono text-xs uppercase tracking-widest text-white/70">CGPA</span>
                <span className="font-display text-2xl font-black text-gradient" style={{ backgroundImage: "linear-gradient(135deg,#EC4899,#06B6D4)" }}>8.144</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}