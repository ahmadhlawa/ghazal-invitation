import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from 'framer-motion';
import { INVITATION } from '../invitation.config';
import { NAMES_LEAD_S } from '../motion';
import { SCENE } from '../scene/assets';
import { Particles } from '../ornaments/Particles';
import { CoupleNames } from './CoupleNames';

interface Props {
  /** بدأ المشهد — يُضبط عند انفتاح البوّابة */
  play: boolean;
}

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * دخول متدرّج بالعمق: السماء أولًا، ثمّ المرتفعات، ثمّ النباتات الأمامية.
 * كل طبقة تبدأ من مقياس أكبر قليلًا فتبدو وكأنها تستقرّ نحو الكاميرا.
 */
const layerIn = (delay: number, from: number, scale: number): Variants => ({
  hidden: { opacity: 0, y: `${from}%`, scale },
  show: {
    opacity: 1,
    y: '0%',
    scale: 1,
    transition: { duration: 1.75, delay, ease: EASE },
  },
});

const fadeOnly: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5 } },
};

/** يبدأ الدعاء مع انقشاع البوّابة، قبل دخول الاسمين أسفل المشهد */
const BLESSING_DELAY = 0.15;

/**
 * المشهد الثالث: التلّة والعروسان.
 *
 * الصورة واحدة تُستعمل في ثلاث طبقات بأقنعة مختلفة (سماء · مرتفعات ·
 * نباتات أمامية)، فنحصل على دخول ذي عمق وتوازٍ عند التمرير بتكلفة فكّ
 * شفرة واحدة — المتصفح يعيد استخدام الصورة المفكوكة لكل نسخة.
 *
 * مع تفضيل تقليل الحركة تُرسم طبقة واحدة بلا قناع ولا توازٍ.
 */
export function HillHero({ play }: Props) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const state = play ? 'show' : 'hidden';

  /* توازٍ عند التمرير — الطبقة الأمامية تتحرّك أكثر من السماء */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const ySky = useTransform(scrollYProgress, [0, 1], ['0%', '6%']);
  const yLand = useTransform(scrollYProgress, [0, 1], ['0%', '-6%']);
  const yFore = useTransform(scrollYProgress, [0, 1], ['0%', '-16%']);

  /* الدعاء ينكشف من خلف قناع: يصعد داخل حاوية قاصّة.
     (لا clip-path — المتصفح يختزل inset إلى ثلاث قيم فتسقط الحركة.) */
  const blessing: Variants = reduced
    ? {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.4, delay: 0.06 } },
      }
    : {
        hidden: { opacity: 0, y: '105%' },
        show: {
          opacity: 1,
          y: '0%',
          transition: { duration: 1.1, delay: NAMES_LEAD_S + BLESSING_DELAY, ease: EASE },
        },
      };

  const layers = reduced
    ? ([['flat', undefined, fadeOnly]] as const)
    : ([
        ['sky', ySky, layerIn(0, -4, 1.12)],
        ['land', yLand, layerIn(0.35, 5, 1.14)],
        ['fore', yFore, layerIn(0.6, 8, 1.2)],
      ] as const);

  return (
    <section ref={ref} className="hero" aria-label="العروسان">
      {layers.map(([name, y, variants]) => (
        <motion.div
          key={name}
          aria-hidden="true"
          className={name === 'flat' ? 'hero__layer' : `hero__layer hero__layer--${name}`}
          style={y ? { y } : undefined}
        >
          <motion.div
            style={{ position: 'absolute', inset: 0 }}
            variants={variants}
            initial="hidden"
            animate={state}
          >
            <img src={SCENE.hill} alt="" />
          </motion.div>
        </motion.div>
      ))}

      <motion.div
        aria-hidden="true"
        className="hero__rays"
        variants={fadeOnly}
        initial="hidden"
        animate={state}
      />
      <div aria-hidden="true" className="hero__scrim" />

      <Particles count={6} variant="petal" peak={0.6} />

      {/* الدعاء في سماء المشهد: منطقة صافية فوق التلّة، بلا صندوق —
          هالة عاجية خفيفة وحدها تحمل القراءة فوق تدرّج الغروب. */}
      <div className="hero__blessing">
        <div className="hero__blessing-mask">
          <motion.p
            className="hero__blessing-text balance"
            variants={blessing}
            initial="hidden"
            animate={state}
          >
            {INVITATION.blessing}
          </motion.p>
        </div>
      </div>

      <div className="hero__content">
        <CoupleNames play={play} />
      </div>
    </section>
  );
}
