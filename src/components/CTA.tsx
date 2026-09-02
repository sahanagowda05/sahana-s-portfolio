import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MagicCard } from './MagicCard';
import './CTA.css';

export function CTA() {
  const skyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = skyRef.current;
    if (!el) return;
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const progress = 1 - Math.min(1, Math.max(0, rect.top / window.innerHeight));
      el.style.transform = `translateY(${progress * -40}px)`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="cta" id="contact">
      <div ref={skyRef} className="cta__sky">
        <img src="/night-sky-final.jpg" alt="" aria-hidden="true" />
      </div>

      <MagicCard className="cta__card">
        <div className="cta__mascot-wrap">
          <img src="/llama-final.png" alt="" className="cta__mascot" />
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          Let's build something.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ delay: 0.1, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          Open to internships, collaborations, and interesting problems.
        </motion.p>

        <motion.div
          className="cta__links"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ delay: 0.2, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          <a href="mailto:sahanassrinivasgowda@gmail.com" className="cta__link cta__link--primary">
            Say hello
          </a>
          <a href="https://github.com/sahanagowda05" target="_blank" rel="noreferrer" className="cta__link">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/sahanas05/" target="_blank" rel="noreferrer" className="cta__link">
            LinkedIn
          </a>
          <a href="https://www.instagram.com/_.sahanaagowdaaa/?utm_source=ig_web_button_share_sheet" target="_blank" rel="noreferrer" className="cta__link">
            Instagram
          </a>
        </motion.div>
      </MagicCard>
    </section>
  );
}