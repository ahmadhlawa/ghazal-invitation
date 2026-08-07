import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { INVITATION } from '../invitation.config';
import { NAMES_LEAD_S } from '../motion';
import { CoupleCrest } from '../ornaments/Ornament';

interface Props {
  /** يبدأ التسلسل مع بدء انفتاح البوّابة */
  play: boolean;
}

const EASE = [0.16, 1, 0.3, 1] as const;

/* توقيت التسلسل — العريس ثمّ الزخرفة ثمّ العروس ثمّ الاستقرار.
   القيم منسوبة إلى لحظة انقشاع البوّابة، لا إلى لحظة الضغط، وتأتي بعد
   دعاء السماء الذي يبدأ في HillHero عند BLESSING_LEAD_S. */
const T = {
  groom: 0.95,
  crest: 1.6,
  bride: 2.05,
  settle: 2.7,
  shimmer: 3.0,
} as const;

/**
 * لحظة الأسماء.
 *
 * ليست تلاشيًا مزدوجًا: يدخل اسم العريس من جهة، وتُرسم الزخرفة من المركز
 * نحو الطرفين، ثمّ يدخل حرف العروس من الجهة المقابلة، ثمّ تستقرّ التركيبة
 * كلّها معًا وتمرّ عليها لمعة ذهبية.
 *
 * الاتجاه يتبع RTL: العريس يدخل من اليمين والعروس من اليسار.
 */
export function CoupleNames({ play }: Props) {
  const reduced = useReducedMotion();
  const state = play ? 'show' : 'hidden';

  /* البوّابة ما تزال تغطّي المشهد في الثانيتين الأوليين — نُزيح التسلسل
     كلّه ليبدأ عند انقشاعها. مع تقليل الحركة تنتهي البوّابة فورًا فلا إزاحة. */
  const lead = reduced ? 0 : NAMES_LEAD_S;

  /* عند تفضيل تقليل الحركة: تلاشٍ متدرّج قصير بلا إزاحة ولا لمعة */
  const fade = (delay: number): Variants => ({
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.4, delay: Math.min(delay, 0.6) * 0.4 } },
  });

  const groom: Variants = reduced
    ? fade(T.groom)
    : {
        hidden: { opacity: 0, x: 64, filter: 'blur(9px)' },
        show: {
          opacity: 1,
          x: 0,
          filter: 'blur(0px)',
          transition: { duration: 1.05, delay: lead + T.groom, ease: EASE },
        },
      };

  const bride: Variants = reduced
    ? fade(T.bride)
    : {
        hidden: { opacity: 0, x: -64, filter: 'blur(9px)' },
        show: {
          opacity: 1,
          x: 0,
          filter: 'blur(0px)',
          transition: { duration: 1.05, delay: lead + T.bride, ease: EASE },
        },
      };

  /* الزخرفة تُرسم من المركز نحو الطرفين */
  const crest: Variants = reduced
    ? fade(T.crest)
    : {
        hidden: { opacity: 0, scaleX: 0.08 },
        show: {
          opacity: 1,
          scaleX: 1,
          transition: { duration: 0.95, delay: lead + T.crest, ease: EASE },
        },
      };

  /* استقرار أخير: التركيبة كلّها تهبط قليلًا إلى وضعها النهائي */
  const settle: Variants = reduced
    ? { hidden: {}, show: {} }
    : {
        hidden: { scale: 1.05 },
        show: { scale: 1, transition: { duration: 1.2, delay: lead + T.settle, ease: EASE } },
      };

  return (
    <div className="names">
      <motion.div className="names__row" variants={settle} initial="hidden" animate={state}>
        <motion.h1
          className="names__groom brass-text"
          variants={groom}
          initial="hidden"
          animate={state}
        >
          {INVITATION.groomName}
        </motion.h1>

        <motion.div
          className="names__ornament"
          variants={crest}
          initial="hidden"
          animate={state}
          style={{ transformOrigin: 'center' }}
        >
          <CoupleCrest width={300} symbol={INVITATION.conjunction} />
        </motion.div>

        <motion.p className="names__bride brass-text" variants={bride} initial="hidden" animate={state}>
          {INVITATION.brideName}
        </motion.p>

        {/* لمعة ذهبية تختم التسلسل */}
        {!reduced && (
          <motion.span
            aria-hidden="true"
            className="names__shimmer"
            initial={{ x: '-130%', opacity: 0 }}
            animate={play ? { x: '130%', opacity: [0, 1, 0] } : undefined}
            transition={{ duration: 1.5, delay: lead + T.shimmer, ease: 'easeInOut' }}
          />
        )}
      </motion.div>
    </div>
  );
}
