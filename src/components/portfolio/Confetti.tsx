import { useEffect, useRef } from "react";

export function ConfettiListener() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    type P = { x: number; y: number; vx: number; vy: number; g: number; life: number; max: number; r: number; c: string };
    let parts: P[] = [];
    let raf = 0;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize(); window.addEventListener("resize", resize);

    const blast = () => {
      const colors = ["#7C3AED", "#06B6D4", "#EC4899", "#3B82F6", "#fff"];
      for (let i = 0; i < 140; i++) {
        parts.push({
          x: canvas.width / 2, y: canvas.height / 2,
          vx: (Math.random() - 0.5) * 14, vy: Math.random() * -12 - 4,
          g: 0.25 + Math.random() * 0.15, life: 0, max: 90 + Math.random() * 40,
          r: 3 + Math.random() * 4, c: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };
    const onEvent = () => blast();
    window.addEventListener("confetti-blast", onEvent);

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.vy += p.g; p.x += p.vx; p.y += p.vy; p.life++;
        ctx.fillStyle = p.c;
        ctx.globalAlpha = Math.max(0, 1 - p.life / p.max);
        ctx.fillRect(p.x, p.y, p.r, p.r);
        if (p.life > p.max) parts.splice(i, 1);
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); window.removeEventListener("confetti-blast", onEvent); };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[95]" aria-hidden />;
}