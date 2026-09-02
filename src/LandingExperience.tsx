import { useState, type ReactNode } from 'react';
import { Landing } from './components/Landing/Landing';
import { PortalTransition } from './components/Transition/Portaltransition';

interface LandingExperienceProps {
  /** The rest of the portfolio — Hero, Marquee, FeaturedProjects, CTA. */
  children: ReactNode;
}

/**
 * Wrap your existing portfolio content with this. It renders the boot
 * sequence + glass panel + particle field, then the portal, and only mounts
 * `children` once the portal finishes — so Hero's own entrance animation
 * fires at the right moment instead of playing while hidden.
 *
 *   <LandingExperience>
 *     <Hero />
 *     <Marquee />
 *     <FeaturedProjects />
 *     <CTA />
 *   </LandingExperience>
 */
export function LandingExperience({ children }: LandingExperienceProps) {
  const [transitioning, setTransitioning] = useState(false);
  const [showPortfolio, setShowPortfolio] = useState(false);

  return (
    <>
      {!showPortfolio && (
        <Landing
          transitioning={transitioning}
          onEnter={() => setTransitioning(true)}
        />
      )}

      <PortalTransition
        active={transitioning}
        onComplete={() => setShowPortfolio(true)}
      />

      {showPortfolio && children}
    </>
  );
}