import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ParticleCanvas } from './Particlecanvas';
import { BootSequence } from './Bootsequence';
import { GlassPanel } from './Glasspanel';
import { EnterButton } from './Enterbutton';
import './Landing.css';

const NAME = 'SAHANA'.split('');
const ROLES = ['AI Engineer', 'Software Developer', 'Generative AI Enthusiast'];

interface LandingProps {
  onEnter: () => void;
  /** True once the portal transition has taken over — Landing fades and stops driving particles. */
  transitioning: boolean;
}

export function Landing({ onEnter, transitioning }: LandingProps) {
  const [booted, setBooted] = useState(false);

  return (
    <div className="landing" aria-hidden={transitioning}>
      <ParticleCanvas className="landing__particles" converging={transitioning} />
      <div className="landing__scrim" />

      <div className="landing__stage">
        <AnimatePresence mode="wait">
          {!booted ? (
            <motion.div
              key="boot"
              exit={{ opacity: 0, transition: { duration: 0.25 } }}
            >
              <BootSequence onComplete={() => setBooted(true)} />
            </motion.div>
          ) : (
            <motion.div
              key="panel"
              animate={{ opacity: transitioning ? 0 : 1 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              <GlassPanel>
                <div className="landing__eyebrow">
                  <span className="landing__eyebrow-dot" />
                  building intelligent software
                </div>

                <h1 className="landing__headline" aria-label="Sahana">
                  {NAME.map((letter, i) => (
                    <span key={i} className="landing__letter-wrap">
                      <motion.span
                        className="landing__letter-blocks"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 0 }}
                        transition={{
                          delay: 0.1 + i * 0.05,
                          duration: 0.3,
                          ease: 'easeOut',
                        }}
                      >
                        <span className="voxel-block voxel-block--1" />
                        <span className="voxel-block voxel-block--2" />
                        <span className="voxel-block voxel-block--3" />
                      </motion.span>
                      <motion.span
                        className="landing__letter"
                        initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{
                          delay: 0.1 + i * 0.05,
                          duration: 0.4,
                          ease: [0.4, 0, 0.2, 1],
                        }}
                      >
                        {letter}
                      </motion.span>
                    </span>
                  ))}
                </h1>

                <motion.p
                  className="landing__subhead"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                >
                  Building Intelligent Software
                </motion.p>

                <motion.ul
                  className="landing__roles"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.7 } },
                  }}
                >
                  {ROLES.map((role) => (
                    <motion.li
                      key={role}
                      variants={{
                        hidden: { opacity: 0, y: 4 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    >
                      {role}
                    </motion.li>
                  ))}
                </motion.ul>

                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                >
                  <EnterButton onEnter={onEnter} disabled={transitioning} />
                </motion.div>
              </GlassPanel>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}