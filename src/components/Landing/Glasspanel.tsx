import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import './GlassPanel.css';

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
}

export function GlassPanel({ children, className }: GlassPanelProps) {
  return (
    <motion.div
      className={`glass-panel ${className ?? ''}`.trim()}
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Hairline gradient border shell, per the Pulse "gradient border
          shell" technique — reads as premium depth rather than a flat
          stroke, without a heavier extra wrapper element per panel. */}
      <div className="glass-panel__shell" />
      <div className="glass-panel__content">{children}</div>
    </motion.div>
  );
}