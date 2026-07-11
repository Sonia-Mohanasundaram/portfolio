import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MessageCircle, Linkedin, Github, Instagram, MapPin, Send, CheckCircle2, Code2 } from "lucide-react";
import emailjs from "@emailjs/browser";
import { z } from "zod";
import { SectionTitle } from "./About";
import { portfolio } from "@/config/portfolio";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  subject: z.string().trim().min(1, "Subject is required").max(150),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

const LINKS = [
  { Icon: Mail, label: "Email", value: portfolio.contact.email, href: `mailto:${portfolio.contact.email}`, color: "#EC4899" },
  { Icon: Phone, label: "Phone", value: portfolio.contact.phoneDisplay, href: `tel:${portfolio.contact.phone}`, color: "#22d3ee" },
  { Icon: MessageCircle, label: "WhatsApp", value: "Chat with me", href: `https://wa.me/${portfolio.contact.whatsapp}`, color: "#22c55e" },
  { Icon: Linkedin, label: "LinkedIn", value: "Connect", href: portfolio.contact.linkedin, color: "#3B82F6" },
  { Icon: Github, label: "GitHub", value: "Follow", href: portfolio.contact.github, color: "#a78bfa" },
  { Icon: Code2, label: "LeetCode", value: "Problems", href: portfolio.contact.leetcode, color: "#f59e0b" },
  { Icon: Instagram, label: "Instagram", value: `@${portfolio.contact.instagramHandle}`, href: portfolio.contact.instagram, color: "#EC4899" },
  { Icon: MapPin, label: "Location", value: portfolio.location, href: "#map", color: "#06B6D4" },
];

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [err, setErr] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      setErr(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }
    setStatus("sending");
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;

    try {
      if (serviceId && templateId && publicKey) {
        await emailjs.send(
          serviceId,
          templateId,
          {
            ...parsed.data,
            to_email: portfolio.contact.email,
            reply_to: parsed.data.email,
            from_name: parsed.data.name,
            from_email: parsed.data.email,
          },
          { publicKey },
        );
      } else {
        const body = `From: ${parsed.data.name} <${parsed.data.email}>\n\n${parsed.data.message}`;
        window.location.href = `mailto:${portfolio.contact.email}?subject=${encodeURIComponent(parsed.data.subject)}&body=${encodeURIComponent(body)}`;
      }
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch (e2) {
      console.error(e2);
      setStatus("error");
      setErr("Transmission failed. Try again or email me directly.");
    }
  };

  return (
    <section id="contact" className="relative px-3 sm:px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="// 07 TRANSMIT" title="Let's Build Something Amazing 🚀" />
        <p className="mx-auto -mt-6 mb-12 max-w-2xl text-center text-white/70">
          Have an opportunity, project, internship, or collaboration? I'd love to hear from you.
        </p>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="aurora-border glass-strong overflow-hidden rounded-3xl">
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-red-500/80" />
                <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
                <span className="h-3 w-3 rounded-full bg-green-500/80" />
              </div>
              <span className="ml-2 font-mono text-xs text-white/60">sonia@portfolio — /contact</span>
            </div>
            <form onSubmit={submit} className="space-y-4 p-6">
              <Field label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="Your name" />
              <Field label="Email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="you@domain.com" type="email" />
              <Field label="Subject" value={form.subject} onChange={(v) => setForm({ ...form, subject: v })} placeholder="Collaboration / job / project" />
              <div>
                <label className="mb-1 block font-mono text-xs uppercase tracking-widest text-cyan-300">Message</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={5}
                  maxLength={2000}
                  placeholder="Tell me about it..."
                  className="w-full rounded-xl glass bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/60"
                />
              </div>
              {err && <div className="rounded-lg bg-red-500/10 px-3 py-2 text-xs text-red-300">{err}</div>}
              <button
                type="submit"
                disabled={status === "sending" || status === "sent"}
                className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 font-mono text-sm font-semibold uppercase tracking-widest text-white transition-transform hover:scale-[1.02]"
                style={{ background: "linear-gradient(135deg,#7C3AED,#06B6D4)", boxShadow: "var(--glow-purple)" }}
              >
                {status === "sent" ? (<><CheckCircle2 className="h-4 w-4" />Message Sent</>) :
                 status === "sending" ? "Transmitting..." : (<><Send className="h-4 w-4" />Send Transmission</>)}
              </button>
              {status === "sent" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center font-mono text-xs text-green-400">
                  Signal received. I'll reply within 24 hours.
                </motion.div>
              )}
            </form>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {LINKS.map(({ Icon, label, value, href, color }, i) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ y: -4 }}
                  className="aurora-border group glass-strong relative flex items-start gap-3 overflow-hidden rounded-2xl p-4"
              >
                <div className="grid h-11 w-11 flex-none place-items-center rounded-xl transition-transform group-hover:scale-110"
                     style={{ background: `linear-gradient(135deg, ${color}, ${color}80)`, boxShadow: `0 0 20px ${color}80` }}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <div className="min-w-0">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-white/60">{label}</div>
                  <div className="truncate font-semibold text-white">{value}</div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        <div id="map" className="mt-10 aurora-border glass-strong overflow-hidden rounded-3xl">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
            <div className="font-mono text-xs uppercase tracking-widest text-cyan-300">// Location</div>
            <div className="font-mono text-xs text-white/60">Namakkal • Tamil Nadu • India</div>
          </div>
          <div className="relative h-56 sm:h-64 md:h-72">
            <iframe
              title="Namakkal, Tamil Nadu, India"
              src="https://www.google.com/maps?q=Namakkal,%20Tamil%20Nadu,%20India&z=11&output=embed"
              className="h-full w-full"
              style={{ filter: "invert(0.92) hue-rotate(180deg) saturate(1.2) contrast(1.05)" }}
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(5,8,22,0.25), transparent 30%, transparent 70%, rgba(5,8,22,0.4))" }} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, value, onChange, placeholder, type = "text" }: { label: string; value: string; onChange: (v: string) => void; placeholder: string; type?: string }) {
  return (
    <div>
      <label className="mb-1 block font-mono text-xs uppercase tracking-widest text-cyan-300">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={type === "email" ? 255 : 150}
        className="w-full rounded-xl glass bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/60"
      />
    </div>
  );
}