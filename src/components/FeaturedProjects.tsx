import { useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import './FeaturedProjects.css';
import { MagicCard } from './MagicCard';

interface Project {
  title: string;
  description: string;
  thumbnail: string;
  tags: string[];
  demoLink: string;
  repoLink: string;
}

// Swap this array for your own projects before shipping.
const PROJECTS: Project[] = [
  {
    title: 'Incident Evidence Locker',
    description: 'Gen AI app integrating Groq LLMs with a Flask + React stack to automate cybersecurity incident analysis and reporting.',
    thumbnail: '/llama-final.png',
    tags: ['React', 'Flask', 'Groq LLMs', 'Gen AI'],
    demoLink: '#',
    repoLink: 'https://github.com/sahanagowda05/incident-evidence-locker',
  },
  {
    title: 'Real-Time Deepfake Detection',
    description: 'Published CNN-LSTM + EfficientNet + MTCNN framework for multimodal deepfake detection, trained on the DFDC dataset.',
    thumbnail: '/enchantedbook.png',
    tags: ['Python', 'TensorFlow', 'OpenCV'],
    demoLink: '#',
    repoLink: '#',
  },
  {
    title: 'Travel Listing Web App',
    description: 'Full-stack Airbnb-style booking platform with auth, listings, and a MySQL-backed REST API — 20% faster data retrieval.',
    thumbnail: '/llama-final.png',
    tags: ['React', 'Node.js', 'MySQL'],
    demoLink: '#',
    repoLink: 'https://github.com/sahanagowda05/wanderlust-fullstack',
  },
];

const VISIBLE_COUNT = 4;
 
function MagneticLink({ href, children }: { href: string; children: React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);
 
  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  };
  const handleLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = 'translate(0, 0)';
  };
 
  return (
    <a
      ref={ref}
      href={href}
      className="project-card__link"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
}
 
function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: (index % VISIBLE_COUNT) * 0.08, ease: [0.4, 0, 0.2, 1] }}
    >
      <motion.div
        // Slow "breathing" scale, independent of hover/tilt transforms.
        animate={{ scale: [1, 1.008, 1] }}
        transition={{ duration: 5 + (index % 3), repeat: Infinity, ease: 'easeInOut' }}
      >
        <MagicCard tilt className="project-card">
          <div className="project-card__body">
            <h3 className="project-card__title">{project.title}</h3>
            <p className="project-card__description">{project.description}</p>
            <ul className="project-card__tags">
              {project.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            <div className="project-card__links">
              {project.demoLink && <MagneticLink href={project.demoLink}>Live demo ↗</MagneticLink>}
              {project.repoLink && <MagneticLink href={project.repoLink}>Source ↗</MagneticLink>}
            </div>
          </div>
        </MagicCard>
      </motion.div>
    </motion.div>
  );
}
 
export function FeaturedProjects() {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? PROJECTS : PROJECTS.slice(0, VISIBLE_COUNT);
 
  return (
    <section className="featured-projects" id="projects">
      {/* Decorative parallax element — subtle drift, not scroll-jacking. */}
      <img
        src="/enchantedbook.png"
        alt=""
        className="featured-projects__parallax"
        aria-hidden="true"
      />
 
      <div className="featured-projects__header">
        <h2>Featured Projects</h2>
        <p>A selection of things I've built.</p>
      </div>
 
      <div className="featured-projects__grid">
        <AnimatePresence>
          {visible.map((project, i) => (
            <ProjectCard project={project} index={i} key={project.title} />
          ))}
        </AnimatePresence>
      </div>
 
      {PROJECTS.length > VISIBLE_COUNT && (
        <button
          type="button"
          className="featured-projects__more"
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? 'Show less' : 'View more'}
        </button>
      )}
    </section>
  );
}