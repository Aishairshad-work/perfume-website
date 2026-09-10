import React, { useEffect, useRef } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// FragranceMist — Premium cinematic hero background canvas layer.
//
// Architecture (bottom → top z-order on canvas):
//   1. Deep ink wash gradient (base atmosphere)
//   2. Slow ambient smoke wisps (right-biased, extremely subtle)
//   3. Tiny floating dust motes (right 60% only — never behind text)
//   4. Soft radial bottle spotlight (right-center)
//
// LEFT SIDE IS INTENTIONALLY KEPT DARK:
//   All emitters are clamped to x > 40% of canvas width so the text
//   area on the left stays clean and fully readable.
// ─────────────────────────────────────────────────────────────────────────────

interface Dust {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  alpha: number;
  maxAlpha: number;
  phase: number;      // sine-wave drift phase
  color: string;
}

interface Wisp {
  x: number;
  y: number;
  rx: number;         // ellipse x-radius
  ry: number;         // ellipse y-radius
  vx: number;
  vy: number;
  alpha: number;
  maxAlpha: number;
  decay: number;
  rotation: number;
  rotSpeed: number;
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
    let tick = 0;

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    // ── Dust motes — tiny, premium, right-biased ──────────────────────────
    const DUST_COUNT = 38;
    const dustColors = [
      'rgba(197,160,89,',    // gold
      'rgba(231,200,122,',   // light gold
      'rgba(255,241,208,',   // warm ivory
      'rgba(160,130,70,',    // deep gold
    ];

    const makeDust = (randomY = false): Dust => {
      // Only spawn in right 58% of screen (bottle / center area)
      const xMin = W * 0.42;
      const maxA = 0.06 + Math.random() * 0.12;
      return {
        x: xMin + Math.random() * (W - xMin),
        y: randomY ? Math.random() * H : H + Math.random() * 60,
        r: 0.6 + Math.random() * 1.8,
        vx: (Math.random() - 0.5) * 0.22,
        vy: -(0.15 + Math.random() * 0.38),
        alpha: 0,
        maxAlpha: maxA,
        phase: Math.random() * Math.PI * 2,
        color: dustColors[Math.floor(Math.random() * dustColors.length)],
      };
    };

    const dust: Dust[] = Array.from({ length: DUST_COUNT }, (_, i) => {
      const d = makeDust(true);
      d.alpha = Math.random() * d.maxAlpha;
      return d;
    });

    // ── Smoke wisps — large soft ellipses, very low opacity ───────────────
    const WISP_COUNT = 7;

    const makeWisp = (randomY = false): Wisp => {
      const xMin = W * 0.38;
      const maxA = 0.018 + Math.random() * 0.028;
      return {
        x: xMin + Math.random() * (W * 0.6),
        y: randomY ? Math.random() * H : H + Math.random() * 200,
        rx: 120 + Math.random() * 180,
        ry: 60 + Math.random() * 100,
        vx: (Math.random() - 0.5) * 0.12,
        vy: -(0.06 + Math.random() * 0.14),
        alpha: 0,
        maxAlpha: maxA,
        decay: 0.00015 + Math.random() * 0.0002,
        rotation: Math.random() * Math.PI,
        rotSpeed: (Math.random() - 0.5) * 0.0008,
      };
    };

    const wisps: Wisp[] = Array.from({ length: WISP_COUNT }, () => {
      const w = makeWisp(true);
      w.alpha = Math.random() * w.maxAlpha * 0.6;
      return w;
    });

    // ── Main render loop ──────────────────────────────────────────────────
    const render = () => {
      tick++;
      ctx.clearRect(0, 0, W, H);

      // ── Layer 1: Deep atmospheric base gradient ──────────────────────
      // Three overlapping radial zones for depth:
      // a) Very subtle warm centre-right glow (bottle area)
      const bottleX = W * 0.72;
      const bottleY = H * 0.45;

      const bottleGlow = ctx.createRadialGradient(bottleX, bottleY, 10, bottleX, bottleY, W * 0.38);
      bottleGlow.addColorStop(0,   'rgba(197,160,89,0.07)');
      bottleGlow.addColorStop(0.4, 'rgba(120,85,35,0.04)');
      bottleGlow.addColorStop(1,   'rgba(5,3,2,0)');
      ctx.fillStyle = bottleGlow;
      ctx.fillRect(0, 0, W, H);

      // b) Subtle warm floor bloom (bottom center)
      const floorGlow = ctx.createRadialGradient(W * 0.65, H * 0.88, 20, W * 0.65, H * 0.88, W * 0.45);
      floorGlow.addColorStop(0,   'rgba(197,160,89,0.055)');
      floorGlow.addColorStop(0.5, 'rgba(80,55,20,0.025)');
      floorGlow.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.fillStyle = floorGlow;
      ctx.fillRect(0, 0, W, H);

      // c) Slow-pulse spotlight brightness variation (sine over time)
      const pulse = 0.5 + 0.5 * Math.sin(tick * 0.003); // very slow
      const spotGlow = ctx.createRadialGradient(bottleX, bottleY, 0, bottleX, bottleY, W * 0.28);
      spotGlow.addColorStop(0,   `rgba(255,220,140,${0.03 + pulse * 0.025})`);
      spotGlow.addColorStop(0.5, `rgba(197,160,89,${0.015 + pulse * 0.01})`);
      spotGlow.addColorStop(1,    'rgba(0,0,0,0)');
      ctx.fillStyle = spotGlow;
      ctx.fillRect(0, 0, W, H);

      // ── Layer 2: Slow cinematic light-ray streaks ─────────────────────
      // Two diagonal soft rays originating from top-right
      drawLightRay(ctx, W, H, tick, 0);
      drawLightRay(ctx, W, H, tick, 1);

      // ── Layer 3: Smoke wisps ──────────────────────────────────────────
      for (let i = 0; i < wisps.length; i++) {
        const w = wisps[i];
        w.x += w.vx;
        w.y += w.vy;
        w.rotation += w.rotSpeed;

        if (w.alpha < w.maxAlpha) w.alpha += w.decay * 4;

        if (w.y < -w.ry * 2) {
          wisps[i] = makeWisp(false);
        }

        ctx.save();
        ctx.translate(w.x, w.y);
        ctx.rotate(w.rotation);
        const wg = ctx.createRadialGradient(0, 0, 0, 0, 0, w.rx);
        wg.addColorStop(0,   `rgba(190,155,80,${w.alpha})`);
        wg.addColorStop(0.5, `rgba(130,100,45,${w.alpha * 0.4})`);
        wg.addColorStop(1,   'rgba(0,0,0,0)');
        ctx.scale(1, w.ry / w.rx);
        ctx.beginPath();
        ctx.arc(0, 0, w.rx, 0, Math.PI * 2);
        ctx.fillStyle = wg;
        ctx.fill();
        ctx.restore();
      }

      // ── Layer 4: Dust motes ───────────────────────────────────────────
      for (let i = 0; i < dust.length; i++) {
        const d = dust[i];
        d.phase += 0.008;
        d.x += d.vx + Math.sin(d.phase) * 0.18;
        d.y += d.vy;

        if (d.alpha < d.maxAlpha) d.alpha += 0.0006;

        if (d.y < -10) {
          dust[i] = makeDust(false);
        }

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `${d.color}${d.alpha})`;
        // Very faint glow halo on larger motes
        if (d.r > 1.2) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = `rgba(231,200,122,${d.alpha * 0.6})`;
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

// ── Helper: draws one slow cinematic light ray ────────────────────────────────
function drawLightRay(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  tick: number,
  index: number,
) {
  // Each ray slowly sweeps across the right half over ~40 s
  const baseAngle = index === 0 ? -0.55 : -0.38;
  const sweep = Math.sin(tick * 0.0012 + index * 2.1) * 0.06;
  const angle = baseAngle + sweep;

  // Origin: top-right corner area
  const ox = W * (0.82 + index * 0.08);
  const oy = 0;

  // Ray length
  const len = H * 1.8;

  const ex = ox + Math.sin(angle) * len;
  const ey = oy + Math.cos(angle) * len;

  const width = 260 + index * 120;
  const alpha = 0.018 + 0.008 * Math.sin(tick * 0.002 + index);

  ctx.save();
  const grad = ctx.createLinearGradient(ox, oy, ex, ey);
  grad.addColorStop(0,   `rgba(220,185,100,${alpha})`);
  grad.addColorStop(0.3, `rgba(197,160,89,${alpha * 0.6})`);
  grad.addColorStop(0.7, `rgba(150,120,55,${alpha * 0.2})`);
  grad.addColorStop(1,   'rgba(0,0,0,0)');

  ctx.beginPath();
  // Draw a wide triangular beam by offsetting perpendicular to the ray
  const perpX = -Math.cos(angle) * width;
  const perpY = Math.sin(angle) * width;

  ctx.moveTo(ox - perpX * 0.05, oy - perpY * 0.05);
  ctx.lineTo(ox + perpX * 0.05, oy + perpY * 0.05);
  ctx.lineTo(ex + perpX, ey + perpY);
  ctx.lineTo(ex - perpX, ey - perpY);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.restore();
}
