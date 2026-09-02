import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './PortalTransition.css';

type Stage = 'portal' | 'flash' | 'done';

interface PortalTransitionProps {
  /** Set true to start the sequence. */
  active: boolean;
  onComplete: () => void;
}

// Stage timing (ms). Kept short and punchy per the moderate motion level
// in the source system — this is a transition, not a cutscene.
const PORTAL_GROW_MS = 700;
const FLASH_MS = 320;

export function PortalTransition({ active, onComplete }: PortalTransitionProps) {
  const [stage, setStage] = useState<Stage>('portal');

  useEffect(() => {
    if (!active) {
      setStage('portal');
      return;
    }
    const t1 = setTimeout(() => setStage('flash'), PORTAL_GROW_MS);
    const t2 = setTimeout(() => {
      setStage('done');
      onComplete();
    }, PORTAL_GROW_MS + FLASH_MS);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return (
    <AnimatePresence>
      {active && stage !== 'done' && (
        <div className="portal-transition" aria-hidden="true">
          <motion.div
            className="portal-transition__ring"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: PORTAL_GROW_MS / 1000,
              ease: [0.4, 0, 0.2, 1],
            }}
          />
          {stage === 'flash' && (
            <motion.div
              className="portal-transition__flash"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: FLASH_MS / 1000, ease: 'easeIn' }}
            />
          )}
        </div>
      )}
    </AnimatePresence>
  );
}