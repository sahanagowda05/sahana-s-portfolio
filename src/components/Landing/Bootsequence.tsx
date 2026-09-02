import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Bootsequence.css';

const LINES = [
  'Initializing interface...',
  'Loading AI modules...',
  'Preparing workspace...',
  'Welcome.',
];

const LINE_INTERVAL_MS = 420;
const HOLD_AFTER_LAST_MS = 380;

interface BootSequenceProps {
  onComplete: () => void;
  skip?: boolean;
}

export function Bootsequence({ onComplete, skip = false }: BootSequenceProps) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (skip) {
      onComplete();
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const interval = prefersReducedMotion ? 0 : LINE_INTERVAL_MS;

    const timers = LINES.map((_, i) =>
      setTimeout(() => setVisibleCount(i + 1), interval * (i + 1)),
    );
    const finalTimer = setTimeout(
      onComplete,
      interval * LINES.length + HOLD_AFTER_LAST_MS,
    );

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(finalTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skip]);

  if (skip) return null;

  return (
    <div className="boot-sequence" role="status" aria-live="polite">
      <AnimatePresence>
        {LINES.slice(0, visibleCount).map((line, i) => (
          <motion.div
            key={line}
            className="boot-sequence__line"
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          >
            <span className="boot-sequence__caret">›</span>
            {line}
            {i === visibleCount - 1 && (
              <span className="boot-sequence__cursor" aria-hidden="true" />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
