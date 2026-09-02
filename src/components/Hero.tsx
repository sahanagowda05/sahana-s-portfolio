import { useState } from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

export function Hero() {
  const [hovered, setHovered] = useState(false);

  const handleImgError =
    (label: string) =>
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      console.warn(
        `[Hero] "${label}" failed to load from ${e.currentTarget.src} — check the file exists in /public with that exact name and extension.`,
      );
    };

  return (
    <section className="hero" id="hero">

      {/* =========================
          HERO CONTENT
          ========================= */}

      <motion.div
        className="hero__content"
        animate={{ y: hovered ? 12 : 0 }}
        transition={{
          duration: 0.45,
          ease: [0.4, 0, 0.2, 1],
        }}
      >

        {/* HEADLINE */}

        <motion.h1
          className="hero__headline"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.045,
                delayChildren: 0.15,
              },
            },
          }}
        >

          <motion.span
            className="hero__word"
            variants={{
              hidden: {
                opacity: 0,
                y: 16,
                filter: 'blur(6px)',
              },
              visible: {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
              },
            }}
            transition={{
              duration: 0.5,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            Building
          </motion.span>


          <motion.span
            className="hero__word"
            variants={{
              hidden: {
                opacity: 0,
                y: 16,
                filter: 'blur(6px)',
              },
              visible: {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
              },
            }}
            transition={{
              duration: 0.5,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            Intelligent
          </motion.span>


          <motion.span
            className="hero__word"
            variants={{
              hidden: {
                opacity: 0,
                y: 16,
                filter: 'blur(6px)',
              },
              visible: {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
              },
            }}
            transition={{
              duration: 0.5,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            Software
          </motion.span>


          {/* Final line */}

          <span className="hero__final-line">

            <motion.span
              className="hero__word hero__word--inline"
              variants={{
                hidden: {
                  opacity: 0,
                  y: 16,
                  filter: 'blur(6px)',
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                },
              }}
              transition={{
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              at
            </motion.span>{' '}

            <motion.span
              className="hero__word hero__word--inline"
              variants={{
                hidden: {
                  opacity: 0,
                  y: 16,
                  filter: 'blur(6px)',
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                },
              }}
              transition={{
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              the
            </motion.span>{' '}

            <motion.span
              className="hero__word hero__word--inline"
              variants={{
                hidden: {
                  opacity: 0,
                  y: 16,
                  filter: 'blur(6px)',
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                },
              }}
              transition={{
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              edge
            </motion.span>{' '}

            <motion.span
              className="hero__word hero__word--inline"
              variants={{
                hidden: {
                  opacity: 0,
                  y: 16,
                  filter: 'blur(6px)',
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                },
              }}
              transition={{
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              of
            </motion.span>{' '}

            <motion.span
              className="hero__word hero__word--inline"
              variants={{
                hidden: {
                  opacity: 0,
                  y: 16,
                  filter: 'blur(6px)',
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                },
              }}
              transition={{
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              Intelligent AI.
            </motion.span>

          </span>
        </motion.h1>


        {/* DESCRIPTION */}

        <motion.p
          className="hero__lede"
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.55,
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          CSE student building at the intersection of software engineering
          and generative AI — from systems that reason to interfaces that
          feel alive.
        </motion.p>


        {/* ACTIONS */}

        <motion.div
          className="hero__actions"
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.7,
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          <a href="/resume.pdf" className="hero__resume" target="_blank" rel="noreferrer">
            <span>View Resume</span>
            <span className="hero__resume-arrow" aria-hidden="true">↗</span>
          </a>
          <nav className="hero__socials" aria-label="Social links">
            <a href="https://github.com/sahanagowda05" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/sahanas05/" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="mailto:sahanassrinivasgowda@gmail.com">Email</a>
          </nav>
        </motion.div>
      </motion.div>

      {/* Stage now renders AFTER content in the DOM and is absolutely
          positioned with a higher z-index, so it visually sits on top of
          the headline — this is what produces the overlap from your
          screenshot. */ }
      <div
        className="hero__stage"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src="/transparent-base.png"
          alt="Sahana's voxel avatar"
          className="hero__avatar-img"
          onError={handleImgError('transparent-base')}
        />
        <motion.img
          src="/transparent-flame.PNG"
          alt=""
          className="hero__avatar-flame"
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          onError={handleImgError('transparent-flame')}
        />
        <span className="hero__stage-hint">Hover</span>
      </div>
    </section>
  );
}
