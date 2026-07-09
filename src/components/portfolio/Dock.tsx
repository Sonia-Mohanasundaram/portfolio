import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, User, Sparkles, FolderKanban, Briefcase, Trophy, GraduationCap, Mail } from "lucide-react";

const ITEMS = [
  { id: "home", label: "Home", Icon: Home },
  { id: "about", label: "About", Icon: User },
  { id: "skills", label: "Skills", Icon: Sparkles },
  { id: "projects", label: "Projects", Icon: FolderKanban },
  { id: "experience", label: "Experience", Icon: Briefcase },
  { id: "achievements", label: "Achievements", Icon: Trophy },
  { id: "education", label: "Education", Icon: GraduationCap },
  { id: "contact", label: "Contact", Icon: Mail },
];

export function Dock() {
  const [visible, setVisible] = useState(true);
  const [active, setActive] = useState("home");

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y < 80 || y < lastY);
      lastY = y;
      // detect active section
      for (const it of ITEMS) {
        const el = document.getElementById(it.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 140 && rect.bottom > 140) {
          setActive(it.id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 24 }}
          className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2"
        >
          <div className="glass-strong flex items-center gap-1 rounded-2xl px-2 py-2 aurora-border" style={{ borderRadius: 22 }}>
            {ITEMS.map(({ id, label, Icon }) => {
              const isActive = active === id;
              return (
                <button
                  key={id}
                  onClick={() => go(id)}
                  aria-label={label}
                  className="group relative flex h-11 w-11 items-center justify-center rounded-xl transition-transform hover:scale-110"
                  style={{
                    background: isActive ? "linear-gradient(135deg, rgba(124,58,237,0.35), rgba(6,182,212,0.35))" : "transparent",
                    boxShadow: isActive ? "0 0 20px rgba(124,58,237,0.6)" : "none",
                  }}
                >
                  <Icon className="h-5 w-5" style={{ color: isActive ? "#fff" : "rgba(255,255,255,0.85)" }} />
                  <span className="pointer-events-none absolute -top-9 whitespace-nowrap rounded-md bg-black/80 px-2 py-1 text-[10px] font-mono uppercase tracking-widest opacity-0 transition-opacity group-hover:opacity-100"
                        style={{ color: "#06B6D4", border: "1px solid rgba(6,182,212,0.4)" }}>
                    {label}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}