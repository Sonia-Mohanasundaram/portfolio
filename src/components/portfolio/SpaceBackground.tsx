import { useEffect, useRef } from "react";

// Animated space background: stars, shooting stars, floating particles, aurora, mouse parallax
export function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.scale(dpr, dpr);

    type Star = { x: number; y: number; r: number; a: number; s: number; d: number };
    type Shooting = { x: number; y: number; vx: number; vy: number; life: number; max: number };

    const stars: Star[] = Array.from({ length: 220 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.4 + 0.2,
      a: Math.random(),
      s: Math.random() * 0.02 + 0.005,
      d: Math.random() * 0.4 + 0.1,
    }));
    const shooting: Shooting[] = [];

    const nodes = Array.from({ length: 40 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    }));

    let shootTimer = 0;
    let raf = 0;

    const onResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.scale(dpr, dpr);
    };
    const onMouse = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / w - 0.5) * 2;
      mouseRef.current.y = (e.clientY / h - 0.5) * 2;
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouse);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Aurora radial glows
      const g1 = ctx.createRadialGradient(w * 0.15 + mx * 40, h * 0.2 + my * 40, 0, w * 0.15, h * 0.2, 500);
      g1.addColorStop(0, "rgba(124,58,237,0.28)");
      g1.addColorStop(1, "rgba(124,58,237,0)");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, w, h);

      const g2 = ctx.createRadialGradient(w * 0.85 - mx * 40, h * 0.75 - my * 40, 0, w * 0.85, h * 0.75, 550);
      g2.addColorStop(0, "rgba(6,182,212,0.22)");
      g2.addColorStop(1, "rgba(6,182,212,0)");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, w, h);

      const g3 = ctx.createRadialGradient(w * 0.5 + mx * 30, h * 0.5 + my * 30, 0, w * 0.5, h * 0.5, 400);
      g3.addColorStop(0, "rgba(236,72,153,0.14)");
      g3.addColorStop(1, "rgba(236,72,153,0)");
      ctx.fillStyle = g3;
      ctx.fillRect(0, 0, w, h);

      // Stars
      for (const st of stars) {
        st.a += st.s;
        const alpha = 0.4 + Math.sin(st.a) * 0.5;
        const px = st.x + mx * st.d * 20;
        const py = st.y + my * st.d * 20;
        ctx.beginPath();
        ctx.arc(px, py, st.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fill();
      }

      // Neural network nodes
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < 160) {
            ctx.strokeStyle = `rgba(124,58,237,${0.15 * (1 - d / 160)})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        ctx.beginPath();
        ctx.arc(nodes[i].x, nodes[i].y, 1.4, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(6,182,212,0.9)";
        ctx.fill();
      }

      // Shooting stars — spawn periodically
      shootTimer++;
      if (shootTimer > 60 * 6 && Math.random() < 0.02) {
        shooting.push({
          x: Math.random() * w,
          y: Math.random() * h * 0.3,
          vx: 8 + Math.random() * 4,
          vy: 4 + Math.random() * 2,
          life: 0,
          max: 60,
        });
        shootTimer = 0;
      }
      for (let i = shooting.length - 1; i >= 0; i--) {
        const s = shooting[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life++;
        const grad = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * 8, s.y - s.vy * 8);
        grad.addColorStop(0, "rgba(255,255,255,0.95)");
        grad.addColorStop(1, "rgba(124,58,237,0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.vx * 8, s.y - s.vy * 8);
        ctx.stroke();
        if (s.life > s.max || s.x > w || s.y > h) shooting.splice(i, 1);
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden" aria-hidden>
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at top, #0a0a2e 0%, #050816 60%, #000 100%)" }} />
      <div className="absolute inset-0 grid-bg opacity-40" />
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 0%, rgba(5,8,22,0.4) 100%)" }} />
    </div>
  );
}