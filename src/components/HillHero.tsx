import { motion, useReducedMotion } from 'framer-motion';
import { BirdFlock, BotanicalGarland, GoldDivider, THEME_ASSET } from './ThemeArt';

interface Props { play: boolean }

export function HillHero({ play }: Props) {
  const reduced = useReducedMotion();
  const initial = reduced ? { opacity: 0 } : { opacity: 0, y: 24 };
  return (
    <section className="storybook-hero" aria-labelledby="hero-names">
      <BotanicalGarland className="storybook-hero__garland" />
      <BirdFlock className="storybook-hero__flock" />
      <motion.div className="storybook-hero__words" initial={initial} animate={play ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: reduced ? .2 : 1.1, delay: reduced ? 0 : 1.65, ease: [0.16, 1, 0.3, 1] }}>
        <p className="storybook-hero__blessing"><span>بارك الله لهما وبارك عليهما</span><span>وجمع بينهما في الخير</span></p>
        <h1 id="hero-names" className="storybook-hero__names" dir="ltr"><span>yousef <i>&amp;</i></span><span>ghazal</span></h1>
        <p className="storybook-hero__names-ar">يوسف وغزل</p>
        <GoldDivider className="storybook-hero__divider" />
      </motion.div>
      <motion.img className="storybook-hero__couple" src={`${THEME_ASSET}/08-couple-meadow.webp`} alt="" aria-hidden="true"
        width="1120" height="630" initial={reduced ? { opacity: 0 } : { opacity: 0, y: 50, scale: 1.04 }}
        animate={play ? { opacity: 1, y: 0, scale: 1 } : undefined} transition={{ duration: reduced ? .2 : 1.5, delay: .25, ease: [0.16, 1, 0.3, 1] }} />
    </section>
  );
}
