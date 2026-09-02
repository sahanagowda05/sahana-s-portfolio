import { useRef, type ReactNode } from 'react';
import './MagicCard.css';

interface MagicCardProps {
  children: ReactNode;
  className?: string;
  /** Adds a subtle tilt-on-hover effect (used for project cards, not CTA). */
  tilt?: boolean;
}

export function MagicCard({ children, className, tilt = false }: MagicCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty('--mx', `${x}px`);
    el.style.setProperty('--my', `${y}px`);

    if (tilt) {
      const rotateX = ((y / rect.height) - 0.5) * -6;
      const rotateY = ((x / rect.width) - 0.5) * 6;
      el.style.setProperty('--rx', `${rotateX}deg`);
      el.style.setProperty('--ry', `${rotateY}deg`);
    }
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };

  return (
    <div
      ref={ref}
      className={`magic-card ${tilt ? 'magic-card--tilt' : ''} ${className ?? ''}`.trim()}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      <div className="magic-card__glow" />
      <div className="magic-card__content">{children}</div>
    </div>
  );
}
