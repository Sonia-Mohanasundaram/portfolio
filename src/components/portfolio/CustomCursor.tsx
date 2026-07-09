import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (dot.current) {
        dot.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
      const el = e.target as HTMLElement | null;
      if (el && el.closest("a, button, [role='button'], input, textarea, [data-cursor='hover']")) {
        setHover(true);
      } else setHover(false);
    };
    window.addEventListener("mousemove", onMove);
    let raf = 0;
    const loop = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15;
      pos.current.y += (target.current.y - pos.current.y) * 0.15;
      if (ring.current) {
        ring.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dot}
        className="pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full"
        style={{ background: "#06B6D4", boxShadow: "0 0 12px #06B6D4, 0 0 24px #7C3AED" }}
      />
      <div
        ref={ring}
        className="pointer-events-none fixed top-0 left-0 z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-full transition-[width,height,border-color,background] duration-200"
        style={{
          width: hover ? 56 : 32,
          height: hover ? 56 : 32,
          border: "1.5px solid rgba(6,182,212,0.9)",
          background: hover ? "rgba(124,58,237,0.15)" : "transparent",
          boxShadow: hover
            ? "0 0 30px rgba(124,58,237,0.6), inset 0 0 20px rgba(6,182,212,0.4)"
            : "0 0 20px rgba(6,182,212,0.35)",
        }}
      />
    </>
  );
}