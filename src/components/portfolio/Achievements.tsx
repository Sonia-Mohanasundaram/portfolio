import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { SectionTitle } from "./About";

const ITEMS = [
  { title: "Special Prize", meta: "TANCAM Hackathon" },
  { title: "AIM'25 Hackathon", meta: "Finalist" },
  { title: "College Symposiums", meta: "Multiple wins" },
  { title: "Paper Presentations", meta: "Speaker" },
  { title: "Project Presentations", meta: "Award recipient" },
  { title: "Mini Hackathons", meta: "Consistent placer" },
];

export function Achievements() {
  return (
    <section id="achievements" className="relative px-3 sm:px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="// 05 TROPHIES" title="Achievements" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -6 }}
              className="aurora-border glass-strong animate-float relative overflow-hidden rounded-2xl p-6 text-center"
              style={{ animationDelay: `${i * 0.3}s` }}
            >
              <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-2xl"
                   style={{ background: "linear-gradient(135deg,#f59e0b,#EC4899)", boxShadow: "0 0 30px rgba(245,158,11,0.6)" }}>
                <Trophy className="h-7 w-7 text-white" />
              </div>
              <div className="font-display text-lg font-bold text-white">{it.title}</div>
              <div className="mt-1 font-mono text-xs uppercase tracking-widest text-cyan-300">{it.meta}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}