import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Download, MessageCircle, Mail, Linkedin, X } from "lucide-react";
import { portfolio } from "@/config/portfolio";

export function HireMeFab() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => setOpen(true)}
        className="fixed left-5 bottom-5 z-40 inline-flex items-center gap-2 rounded-full px-5 py-3 font-mono text-xs font-bold uppercase tracking-widest text-white"
        style={{ background: "linear-gradient(135deg,#EC4899,#7C3AED)", boxShadow: "var(--glow-pink)" }}
      >
        <Sparkles className="h-4 w-4" />Hire Me
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] grid place-items-center bg-black/70 backdrop-blur-md p-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="aurora-border glass-strong relative w-full max-w-md rounded-3xl p-8 text-center"
            >
              <button onClick={() => setOpen(false)} className="absolute right-4 top-4 rounded-full glass p-2 text-white"><X className="h-4 w-4" /></button>
              <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl"
                   style={{ background: "linear-gradient(135deg,#EC4899,#7C3AED)", boxShadow: "var(--glow-pink)" }}>
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-display text-2xl font-black text-white">Let's Work Together</h3>
              <p className="mt-2 text-sm text-white/70">Available for internships, freelance, full-time, and remote.</p>
              <div className="mt-6 grid grid-cols-2 gap-2">
                {["Internships", "Freelance", "Full-time", "Remote"].map((t) => (
                  <span key={t} className="rounded-full glass px-3 py-1.5 font-mono text-xs text-cyan-200">{t}</span>
                ))}
              </div>
              <div className="mt-6 grid gap-2">
                <a href={portfolio.resumeUrl} download className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-white"
                   style={{ background: "linear-gradient(135deg,#7C3AED,#06B6D4)", boxShadow: "var(--glow-purple)" }}>
                  <Download className="h-4 w-4" />Download Resume
                </a>
                <div className="grid grid-cols-3 gap-2">
                  <a href={`https://wa.me/${portfolio.contact.whatsapp}`} target="_blank" rel="noreferrer" className="glass rounded-full py-2 text-white"><MessageCircle className="mx-auto h-4 w-4" /></a>
                  <a href={`mailto:${portfolio.contact.email}`} className="glass rounded-full py-2 text-white"><Mail className="mx-auto h-4 w-4" /></a>
                  <a href={portfolio.contact.linkedin} target="_blank" rel="noreferrer" className="glass rounded-full py-2 text-white"><Linkedin className="mx-auto h-4 w-4" /></a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}