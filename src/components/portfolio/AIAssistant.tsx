import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, X } from "lucide-react";
import avatar from "@/assets/Sonia new passport size.jpg";
import { portfolio } from "@/config/portfolio";

type Msg = { from: "ai" | "me"; text: string };

const QUICK = ["Who is Sonia?", "Projects", "Skills", "Education", "Resume", "Contact", "Achievements", "Career Goals"];

function answer(q: string): string {
  const s = q.toLowerCase();
  if (s.includes("who")) return "Sonia M is a Computer Science Engineering student and AI Software Developer building intelligent, beautiful software.";
  if (s.includes("project")) return "Recent projects: AI Interview Simulator, Intelligent Flashcards, AI Outreach Hub, AI Vendor Selection, Green Chilli Disease Detection, and Hospital Appointment Booking. Scroll to Projects to explore.";
  if (s.includes("skill")) return "Sonia works across Python, Java, JS/TS, React, Tailwind, FastAPI, Flask, MongoDB, PostgreSQL, TensorFlow, OpenCV, LLMs (Whisper, Ollama, spaCy), and modern AI tooling.";
  if (s.includes("education") || s.includes("study") || s.includes("college")) return "Nandha Engineering College — B.E. Computer Science Engineering. CGPA 8.144.";
  if (s.includes("resume") || s.includes("cv")) return "Download her resume from the hero section (Download Resume button).";
  if (s.includes("contact") || s.includes("reach") || s.includes("email")) return `Email ${portfolio.contact.email} · WhatsApp ${portfolio.contact.phoneDisplay}.`;
  if (s.includes("achievement") || s.includes("award")) return "Special Prize at TANCAM Hackathon, AIM'25 Hackathon finalist, multiple symposium and mini-hackathon wins.";
  if (s.includes("career") || s.includes("goal")) return "Goal: ship AI products used by millions — combining research-grade ML with delightful product craft.";
  if (s.includes("hire") || s.includes("intern") || s.includes("job")) return "Available for internships, freelance, full-time, and remote roles. Tap Hire Me!";
  return "Ask about projects, skills, education, resume, or contact — I know Sonia inside out.";
}

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{ from: "ai", text: "Hi 👋 I'm Sonia's AI Assistant. Ask me anything." }]);
  const [input, setInput] = useState("");
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => { scroller.current?.scrollTo({ top: 9e9, behavior: "smooth" }); }, [msgs]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMsgs((m) => [...m, { from: "me", text }]);
    setInput("");
    setTimeout(() => setMsgs((m) => [...m, { from: "ai", text: answer(text) }]), 380);
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label="AI Assistant"
        className="fixed bottom-4 right-4 z-40 h-12 w-12 overflow-hidden rounded-full aurora-border animate-pulse-glow sm:bottom-24 sm:right-5 sm:h-14 sm:w-14"
        style={{ boxShadow: "var(--glow-purple)" }}
      >
        <img src={avatar} alt="Sonia AI" className="h-full w-full object-cover" style={{ objectPosition: "50% 15%" }} />
        <span className="absolute -top-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-green-500 text-[9px] font-bold text-white ring-2 ring-black">AI</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 right-4 z-40 flex h-[min(460px,calc(100vh-7rem))] w-[min(340px,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl glass-strong aurora-border sm:bottom-44 sm:right-5 sm:h-[460px] sm:w-[340px]"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-cyan-300" />
                <div>
                  <div className="font-display text-sm font-bold text-white">Sonia AI</div>
                  <div className="font-mono text-[10px] text-green-400">● Online</div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="rounded-full p-1 text-white/70 hover:text-white"><X className="h-4 w-4" /></button>
            </div>
            <div ref={scroller} className="flex-1 space-y-2 overflow-y-auto p-3">
              {msgs.map((m, i) => (
                <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${m.from === "me" ? "text-white" : "text-white/90 glass"}`}
                       style={m.from === "me" ? { background: "linear-gradient(135deg,#7C3AED,#06B6D4)" } : undefined}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-white/10 p-2">
              <div className="mb-2 flex flex-wrap gap-1">
                {QUICK.map((q) => (
                  <button key={q} onClick={() => send(q)} className="rounded-full glass px-2.5 py-1 font-mono text-[10px] text-cyan-200 hover:text-white">{q}</button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") send(input); }}
                  placeholder="Ask about Sonia..."
                  maxLength={200}
                    className="flex-1 rounded-full glass bg-transparent px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none"
                />
                <button onClick={() => send(input)} className="grid h-9 w-9 place-items-center rounded-full"
                        style={{ background: "linear-gradient(135deg,#7C3AED,#06B6D4)", boxShadow: "var(--glow-purple)" }}>
                  <Send className="h-4 w-4 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}