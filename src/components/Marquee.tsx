import './Marquee.css';

const SKILLS = [
  'Large Language Models (LLMs)',
  'Neural Networks',
  'Retrieval-Augmented Generation (RAG)',
  'Machine Learning',
  'Prompt Engineering',
  'Deep Learning',
  'Vector Databases',
  'Model Fine-tuning',
  'Generative AI',
];

const DEV_SKILLS = [
  'TypeScript',
  'React',
  'Node.js',
  'Python',
  'PostgreSQL',
  'Docker',
  'REST APIs',
  'Git',
];

interface MarqueeRowProps {
  items: string[];
  direction: 'left' | 'right';
  label: string;
}

function MarqueeRow({ items, direction, label }: MarqueeRowProps) {
  // Duplicate the list so the CSS animation can loop seamlessly at -50%.
  const loop = [...items, ...items];

  return (
    <div className="marquee-row" aria-label={label}>
      <img
        src="/nether-portal-nobg.png"
        alt=""
        className="marquee-row__portal marquee-row__portal--left"
      />

      <div className="marquee-row__viewport">
        <div
          className={`marquee-row__track marquee-row__track--${direction}`}
        >
          {loop.map((item, i) => (
            <span className="marquee-row__item" key={`${item}-${i}`}>
              {item}
            </span>
          ))}
        </div>
      </div>

      <img
        src="/nether-portal-nobg.png"
        alt=""
        className="marquee-row__portal marquee-row__portal--right"
      />
    </div>
  );
}

export function Marquee() {
  return (
    <section className="marquee" aria-label="Skills">
      <MarqueeRow items={SKILLS} direction="left" label="skills" />
      <MarqueeRow items={DEV_SKILLS} direction="right" label="Development skills" />
    </section>
  );
}