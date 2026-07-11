import { motion } from "framer-motion";
import { Monitor, GraduationCap, BadgeCheck } from "lucide-react";
import { SectionTitle } from "./About";

const EDU = [{
  title: "Nandha Engineering College",
  role: "B.E. Computer Science Engineering",
  meta: "CGPA — 8.144",
}];

const INTERN = [
  { title: "Frontend Developer Intern", org: "WeeWay InfoTech - Coimbatore", desc: "Built responsive UI, componentized design system, shipped product surfaces." },
  { title: "AI Software Developer Intern", org: "Shellkode - Coimbatore", desc: "Prototyped LLM-driven features, integrated inference pipelines with product APIs." },
  { title: "AI Internship", org: "Rinex -Bangalore", desc: "Applied AI on real-world datasets — data prep, model training, deployment." },
];

const CERTS = [
  "Infosys Springboard — HTML", "Infosys Springboard — CSS",
  "NPTEL — Cloud Computing", "NPTEL — Cyber Security", "NPTEL — Forest Management",
];

export function Experience() {
  return (
    <section id="experience" className="relative px-3 sm:px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="// 04 TIMELINE" title="Experience & Journey" />
     <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 h-full w-[2px] -translate-x-1/2"
               style={{ background: "linear-gradient(180deg, transparent, #7C3AED, #06B6D4, #EC4899, transparent)", boxShadow: "0 0 20px #7C3AED" }} />

          <TimelineGroup icon={GraduationCap} title="Education" items={EDU.map(e => ({ head: e.title, sub: e.role, tag: e.meta }))} align="left" />
          <TimelineGroup icon={Monitor} title="Internships" items={INTERN.map(e => ({ head: e.title, sub: e.org, tag: e.desc }))} align="right" />
          <TimelineGroup icon={BadgeCheck} title="Certifications" items={CERTS.map(c => ({ head: c, sub: "", tag: "" }))} align="left" />
        </div>
      </div>
    </section>
  );
}

type Icn = React.ComponentType<{ className?: string }>;
function TimelineGroup({ icon: Icon, title, items, align }: { icon: Icn; title: string; items: { head: string; sub: string; tag: string }[]; align: "left" | "right" }) {
  return (
    <div className="mb-8">
      <div className="relative mb-4 flex items-center justify-center">
        <div className="inline-flex items-center gap-2 rounded-full glass-strong px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-cyan-300"
             style={{ boxShadow: "0 0 20px rgba(6,182,212,0.4)" }}>
          <Icon className="h-4 w-4" />{title}
        </div>
      </div>
      <div className="space-y-6">
        {items.map((it, i) => (
          <motion.div
            key={it.head + i}
            initial={{ opacity: 0, x: align === "left" ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className={`relative flex ${align === "right" ? "md:justify-end" : "md:justify-start"} pl-12 md:pl-0`}
          >
            <div className="absolute left-4 md:left-1/2 -translate-x-1/2 h-4 w-4 rounded-full"
                 style={{ background: "radial-gradient(#fff, #06B6D4)", boxShadow: "0 0 20px #06B6D4" }} />
            <div className={`glass-strong aurora-border relative w-full overflow-hidden rounded-2xl p-4 sm:p-5 md:w-[46%] ${align === "right" ? "md:ml-auto" : ""}`}>
              <div className="font-display text-base sm:text-lg font-bold text-white">{it.head}</div>
              {it.sub && <div className="mt-0.5 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-cyan-300">{it.sub}</div>}
              {it.tag && <div className="mt-2 text-xs sm:text-sm text-white/75">{it.tag}</div>}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}