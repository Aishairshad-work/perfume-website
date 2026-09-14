import React, { useEffect, useRef } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// FragranceMist — Light luxury ambient particle canvas.
// Generates ultra-fine golden light motes drifting gently on the right side
// behind the perfume bottle to add natural radiance without obscuring text.
// ─────────────────────────────────────────────────────────────────────────────

interface Dust {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  alpha: number;
  maxAlpha: number;
  phase: number;
  color: string;
}

export const FragranceMist: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf: number;
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    // Dust motes — tiny, luminous, right-biased (behind product)
    const DUST_COUNT = 28;
    const dustColors = [
      'rgba(197,160,89,',    // classic gold
      'rgba(218,185,120,',   // warm champagne
      'rgba(173,137,68,',    // deep gold
    ];

    const makeDust = (randomY = false): Dust => {
      const xMin = W * 0.45;
      const maxA = 0.12 + Math.random() * 0.22;
      return {
        x: xMin + Math.random() * (W - xMin),
        y: randomY ? Math.random() * H : H + Math.random() * 40,
        r: 0.8 + Math.random() * 1.6,
        vx: (Math.random() - 0.5) * 0.2,
        vy: -(0.18 + Math.random() * 0.32),
        alpha: 0,
        maxAlpha: maxA,
        phase: Math.random() * Math.PI * 2,
        color: dustColors[Math.floor(Math.random() * dustColors.length)],
      };
    };

    const dust: Dust[] = Array.from({ length: DUST_COUNT }, () => {
      const d = makeDust(true);
      d.alpha = Math.random() * d.maxAlpha;
      return d;
    });

    const render = () => {
      ctx.clearRect(0, 0, W, H);

      for (let i = 0; i < dust.length; i++) {
        const d = dust[i];
        d.phase += 0.009;
        d.x += d.vx + Math.sin(d.phase) * 0.16;
        d.y += d.vy;

        if (d.alpha < d.maxAlpha) d.alpha += 0.001;

        if (d.y < -10) {
          dust[i] = makeDust(false);
        }

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `${d.color}${d.alpha})`;
        if (d.r > 1.2) {
          ctx.shadowBlur = 6;
          ctx.shadowColor = `rgba(197,160,89,${d.alpha * 0.8})`;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      raf = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10 w-full h-full"
      aria-hidden="true"
    />
  );
};
