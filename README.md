# Portfolio — Hero, Marquee, Featured Projects & CTA

Built from the `full_portfolio_guide.pdf` spec, section by section:

- **Hero** — mouse/touch-following spotlight reveal (lerp-smoothed), word-by-word
  animated headline, layered hover CTA button, preload skeleton.
- **Marquee** — two crisscrossing scrolling skill rows framed by portal images,
  reusable with `direction="left" | "right"`.
- **Featured Projects** — 2-column grid, breathing card animation, parallax
  clouds, expandable "View More" with staggered fade/blur entrance.
- **CTA** — parallax night-sky background, mascot-topped glassmorphic card,
  MagicCard spotlight-hover glow, contact links.

## Run it

npm install
npm run dev

## Swap in your real generated images

Every image referenced in the guide is currently a placeholder .svg in
/public so the site runs out of the box. Once you generate the real assets
using the prompts in the PDF (Sections 1, 2, 8, 10, 12, 13), replace these
files with your PNGs and update the src/backgroundImage paths in the
components to match:

| Placeholder (current)     | Real file (from guide)   | Used in                |
|----------------------------|----------------------------|--------------------------|
| transparent-base.svg       | transparent-base.png       | Hero.tsx                |
| transparent-flame.svg      | transparent-flame.png      | Hero.tsx                |
| nether-portal-nobg.svg     | nether-portal-nobg.png     | Marquee.tsx              |
| enchantedbook.svg          | enchantedbook.png          | FeaturedProjects.tsx     |
| llama-nobg.svg             | llama-nobg.png             | CTA.tsx                  |
| night-sky.svg              | your night-sky filename    | CTA.tsx                  |

For background removal (rembg), once you have the raw generated PNGs:

pip install rembg[cpu] --break-system-packages
python -c "from rembg import remove; open('nether-portal-nobg.png','wb').write(remove(open('nether-portal.png','rb').read()))"

(repeat per file, or hand it to a coding agent per the guide.)

## Your own project data

Replace the PROJECTS array in src/components/FeaturedProjects.tsx with your
real projects (title, description, thumbnail, demo link, repo link).

## Resume link

The "View Resume" button in Hero.tsx points to /resume.pdf — drop your
resume PDF into /public/resume.pdf, or swap the href for an external link.
