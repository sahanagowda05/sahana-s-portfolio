import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface EnterButtonProps {
  onEnter: () => void;
  disabled?: boolean;
}

export function Enterbutton({ onEnter, disabled }: EnterButtonProps) {
  const firedRef = useRef(false);

  const fire = () => {
    if (firedRef.current || disabled) return;
    firedRef.current = true;
    onEnter();
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter') fire();
    };
    let scrollAccum = 0;
    const handleWheel = (e: WheelEvent) => {
      scrollAccum += e.deltaY;
      if (scrollAccum > 60) fire();
    };
    window.addEventListener('keydown', handleKey);
    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => {
      window.removeEventListener('keydown', handleKey);
      window.removeEventListener('wheel', handleWheel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled]);

  return (
    <motion.button
      type="button"
      className="enter-button"
      onClick={fire}
      whileHover="hover"
      whileTap={{ scale: 0.97 }}
      initial="rest"
      transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
    >
      <span>ENTER</span>
      <motion.span
        className="enter-button__arrow"
        aria-hidden="true"
        variants={{ rest: { x: 0 }, hover: { x: 4 } }}
        transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
      >
        →
      </motion.span>
    </motion.button>
  );
}
