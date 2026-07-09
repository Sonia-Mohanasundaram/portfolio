import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X, Sparkles } from "lucide-react";
import aiOutreachImg from "@/assets/ai-outreach.png";
import aiVendorImg from "@/assets/ai-vendor-img.png";
import smartFlashcardsImg from "@/assets/smart-flashcards.png";
import hospitalAppointmentImg from "@/assets/hospital-appointment.png";
import { SectionTitle } from "./About";

const greenChilliImg = new URL("../../assets/chilli.JPG", import.meta.url).href;

type Project = {
  title: string; blurb: string; tech: string[]; features: string[];
  gradient: string; github?: string; demo?: string;
};

const PROJECTS: Project[] = [
  {
    title: "AI Interview Simulator",
    blurb: "Realtime AI-powered mock interviews with speech, transcription, and adaptive feedback.",
    tech: ["React", "TypeScript", "Tailwind", "Flask", "Python", "Whisper", "Ollama", "PostgreSQL"],
    features: ["Voice input via Whisper", "Local LLM feedback via Ollama", "Scoring & analytics", "Custom role-based questions"],
    gradient: "linear-gradient(135deg,#7C3AED,#06B6D4)",
    github: "https://github.com/Sonia-Mohanasundaram/ai-interview-simulator.git",
  },
  {
    title: "Intelligent Flashcards",
    blurb: "NLP-driven flashcards that auto-generate cards from any text and adapt via spaced repetition.",
    tech: ["React", "Flask", "spaCy", "MongoDB", "JWT"],
    features: ["Auto card generation", "Spaced repetition engine", "Secure JWT auth", "Personal decks"],
    gradient: "linear-gradient(135deg,#EC4899,#7C3AED)",
    github: "https://github.com/Sonia-Mohanasundaram/intelligent-flashcards.git",
  },
  {
    title: "AI Outreach Hub ( Infynd company task Purpose after got shortlsted in Hackathon for experience )",
    blurb: "Automates personalized outreach with LLMs, contact enrichment, and email drafting.",
    tech: ["HTML", "CSS", "JavaScript", "Python", "FastAPI", "LLM", "PostgreSQL"],
    features: ["Personalized message generation", "Bulk pipelines", "Contact scoring", "Analytics dashboard"],
    gradient: "linear-gradient(135deg,#3B82F6,#06B6D4)",
    github: "https://github.com/Sonia-Mohanasundaram/ai-outreach-hub.git",
  },
  {
    title: "AI Vendor Selection",
    blurb: "OCR + CV pipeline that scores vendors from documents, catalogs, and product photos.",
    tech: ["React", "FastAPI", "Python", "OCR", "OpenCV", "PostgreSQL"],
    features: ["Document OCR", "Product image scoring", "Vendor ranking", "Explainable results"],
    gradient: "linear-gradient(135deg,#06B6D4,#7C3AED)",
    github: "https://github.com/Sonia-Mohanasundaram/ai-vendor-selection.git",
  },
  {
    title: "Green Chilli Disease Detection",
    blurb: "CNN + Transfer Learning model that detects leaf diseases from mobile-camera images.",
    tech: ["Python", "TensorFlow", "CNN", "Transfer Learning", "OpenCV"],
    features: ["Mobile-friendly", "Multi-class detection", "Confidence heatmaps", "Farm-ready UX"],
    gradient: "linear-gradient(135deg,#22d3ee,#4ade80)",
    github: "https://github.com/Sonia-Mohanasundaram/Chilli.git",
  },
  {
    title: "Hospital Appointment Booking",
    blurb: "Full-stack booking platform with role dashboards for patients, doctors, and admins.",
    tech: ["React", "FastAPI", "MongoDB"],
    features: ["Role-based auth", "Live availability", "Automated reminders", "Admin analytics"],
    gradient: "linear-gradient(135deg,#f472b6,#7C3AED)",
    github: "https://github.com/Sonia-Mohanasundaram",
    demo: "https://ssn-hospital.in",
  },
];

export function Projects() {
  const [open, setOpen] = useState<Project | null>(null);
  return (
    <section id="projects" className="relative px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow="// 03 CASE FILES" title="Projects" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} p={p} i={i} onOpen={() => setOpen(p)} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] grid place-items-center bg-black/75 backdrop-blur-md p-4"
            onClick={() => setOpen(null)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="aurora-border glass-strong relative w-full max-w-2xl overflow-hidden rounded-3xl"
            >
              <div className="relative h-40" style={{ background: open.gradient }}>
                <div className="absolute inset-0 grid-bg opacity-40" />
                <div className="absolute inset-0 flex items-end p-6">
                  <h3 className="font-display text-3xl font-black text-white drop-shadow">{open.title}</h3>
                </div>
              </div>
              <button onClick={() => setOpen(null)} className="absolute right-4 top-4 rounded-full glass p-2 text-white">
                <X className="h-4 w-4" />
              </button>
              <div className="space-y-5 p-6">
                <p className="text-white/80">{open.blurb}</p>
                <div>
                  <div className="mb-2 font-mono text-xs uppercase tracking-widest text-cyan-300">Features</div>
                  <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {open.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-white/85"><Sparkles className="mt-0.5 h-4 w-4 text-cyan-400" />{f}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="mb-2 font-mono text-xs uppercase tracking-widest text-cyan-300">Tech Stack</div>
                  <div className="flex flex-wrap gap-2">
                    {open.tech.map((t) => (
                      <span key={t} className="rounded-full glass px-3 py-1 font-mono text-xs text-white/90">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <a href={open.github || "#"} target="_blank" rel="noreferrer"
                     className="inline-flex items-center gap-2 rounded-full glass-strong px-4 py-2 text-sm text-white hover:glow-cyan">
                    <Github className="h-4 w-4" />GitHub
                  </a>
                  {open.demo && open.title === "Hospital Appointment Booking" && (
                    <a href={open.demo} target="_blank" rel="noreferrer"
                       className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white"
                       style={{ background: "linear-gradient(135deg,#7C3AED,#06B6D4)", boxShadow: "var(--glow-purple)" }}>
                      <ExternalLink className="h-4 w-4" />Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectCard({ p, i, onOpen }: { p: Project; i: number; onOpen: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateZ(0)`;
  };
  const onLeave = () => { const el = ref.current; if (el) el.style.transform = ""; };
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.05 }}
    >
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onClick={onOpen}
        className="aurora-border group relative cursor-pointer overflow-hidden rounded-2xl glass-strong p-5"
        style={{ transformStyle: "preserve-3d", transition: "transform 0.15s ease-out" }}
      >
        <div className="mb-4 h-32 overflow-hidden rounded-xl" style={{ background: p.gradient }}>
          {p.title === "AI Vendor Selection" ? (
            <img src={aiVendorImg} alt={p.title} className="h-full w-full object-cover object-center" />
          ) : p.title === "Intelligent Flashcards" ? (
            <img src={smartFlashcardsImg} alt={p.title} className="h-full w-full object-cover object-center" />
          ) : p.title === "AI Outreach Hub ( Infynd company task Purpose after got shortlsted in Hackathon for experience )" ? (
            <img src={aiOutreachImg} alt={p.title} className="h-full w-full object-cover" style={{ objectPosition: "50% 58%" }} />
          ) : p.title === "Green Chilli Disease Detection" ? (
            <img src={greenChilliImg} alt={p.title} className="h-full w-full object-cover object-center" />
          ) : p.title === "Hospital Appointment Booking" ? (
            <img src={hospitalAppointmentImg} alt={p.title} className="h-full w-full object-cover object-center" />
          ) : (
            <div className="h-full w-full grid-bg opacity-40" />
          )}
        </div>
        <h3 className="font-display text-lg font-bold text-white">{p.title}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-white/70">{p.blurb}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {p.tech.slice(0, 4).map((t) => (
            <span key={t} className="rounded-full glass px-2 py-0.5 font-mono text-[10px] text-cyan-200">{t}</span>
          ))}
          {p.tech.length > 4 && <span className="rounded-full glass px-2 py-0.5 font-mono text-[10px] text-white/70">+{p.tech.length - 4}</span>}
        </div>
      </div>
    </motion.div>
  );
}