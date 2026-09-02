import { LandingExperience } from './LandingExperience';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { FeaturedProjects } from './components/FeaturedProjects';
import { CTA } from './components/CTA';

function App() {
  return (
    <LandingExperience>
      <Hero />
      <Marquee />
      <FeaturedProjects />
      <CTA />
    </LandingExperience>
  );
}

export default App;
 
    

   