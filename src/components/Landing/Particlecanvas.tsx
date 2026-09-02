import { useEffect, useRef } from 'react';

// Palette lives here rather than in CSS because the canvas draws these
// directly. Kept close to the Pulse system's role (accent / secondary /
// tertiary) but recast in the voxel/AI cool range instead of orange.
const PALETTE = ['#8B5CF6', '#4F7CFF', '#22D3EE'] as const;

interface Particle {
  x: number;
  y: number;
  homeX: number;
  homeY: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  phase: number; // offset into the breathing cycle so particles don't pulse in lockstep
}

interface ParticleCanvasProps {
  /** When true, particles abandon ambient drift and stream toward `convergeTo`. */
  converging?: boolean;
  /** Normalized 0–1 screen coords particles stream toward while converging. */
  convergeTo?: { x: number; y: number };
  /** 0–1 progress of the converge animation, driven by the parent transition. */
  convergeProgress?: number;
  className?: string;
}

const DENSITY = 14000; // px^2 per particle — lower = denser field
const REPULSE_RADIUS = 120;
const REPULSE_STRENGTH = 0.6;
const RETURN_EASE = 0.02;
const DRIFT_EASE = 0.0006;

export function ParticleCanvas({
  converging = false,
  convergeTo = { x: 0.5, y: 0.42 },
  convergeProgress = 0,
  className,
}: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const pointerRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);
  const timeRef = useRef(0);
  const convergingRef = useRef(converging);
  const convergeToRef = useRef(convergeTo);
  const convergeProgressRef = useRef(convergeProgress);

  convergingRef.current = converging;
  convergeToRef.current = convergeTo;
  convergeProgressRef.current = convergeProgress;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const seedParticles = (w: number, h: number) => {
      const count = Math.floor((w * h) / DENSITY);
      const particles: Particle[] = [];
      for (let i = 0; i < count; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        particles.push({
          x,
          y,
          homeX: x,
          homeY: y,
          vx: 0,
          vy: 0,
          size: Math.random() * 1.6 + 0.6,
          color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
          phase: Math.random() * Math.PI * 2,
        });
      }
      particlesRef.current = particles;
    };

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedParticles(w, h);
    };

    resize();
    window.addEventListener('resize', resize);

    const handlePointerMove = (e: PointerEvent) => {
      pointerRef.current = { x: e.clientX, y: e.clientY };
    };
    const handlePointerLeave = () => {
      pointerRef.current = { x: -9999, y: -9999 };
    };
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerleave', handlePointerLeave);

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    const tick = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      timeRef.current += prefersReducedMotion ? 0 : 0.016;

      ctx.clearRect(0, 0, w, h);

      const isConverging = convergingRef.current;
      const target = convergeToRef.current;
      const progress = convergeProgressRef.current;
      const targetX = target.x * w;
      const targetY = target.y * h;

      for (const p of particlesRef.current) {
        if (isConverging) {
          // Stream toward the portal center; progress eases the pull so it
          // reads as acceleration rather than a snap.
          const pull = 0.02 + progress * 0.12;
          p.vx += (targetX - p.x) * pull * 0.02;
          p.vy += (targetY - p.y) * pull * 0.02;
          p.vx *= 0.9;
          p.vy *= 0.9;
        } else {
          // Ambient drift: gentle wander around home position.
          const driftX =
            Math.sin(timeRef.current * 0.4 + p.phase) * 0.15;
          const driftY =
            Math.cos(timeRef.current * 0.3 + p.phase) * 0.15;

          const dx = pointerRef.current.x - p.x;
          const dy = pointerRef.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < REPULSE_RADIUS) {
            const force = (1 - dist / REPULSE_RADIUS) * REPULSE_STRENGTH;
            p.vx -= (dx / (dist || 1)) * force;
            p.vy -= (dy / (dist || 1)) * force;
          }

          p.vx += (p.homeX - p.x) * RETURN_EASE * 0.1 + driftX * DRIFT_EASE * 60;
          p.vy += (p.homeY - p.y) * RETURN_EASE * 0.1 + driftY * DRIFT_EASE * 60;
          p.vx *= 0.92;
          p.vy *= 0.92;
        }

        p.x += p.vx;
        p.y += p.vy;

        const breathe = prefersReducedMotion
          ? 1
          : 0.65 + Math.sin(timeRef.current * 0.6 + p.phase) * 0.35;
        const fadeOnConverge = isConverging ? 1 - progress * 0.7 : 1;
        const alpha = Math.max(0, breathe * fadeOnConverge);

        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      style={{ display: 'block', position: 'absolute', inset: 0 }}
    />
  );
}