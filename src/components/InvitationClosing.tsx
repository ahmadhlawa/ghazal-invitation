import { motion, useReducedMotion } from 'framer-motion';
import { INVITATION, coupleTitle } from '../invitation.config';
import { SCENE } from '../scene/assets';
import { LeafDivider } from '../ornaments/Ornament';
import { Reveal, VIEWPORT } from './Reveal';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * الختام: إطار عاجي عمودي محفور بقلب مضيء يحمل الدعاء الأخير.
 * الإطار نفسه يدخل بمقياس خفيف كأنّه يُقرَّب من الجدار، ثمّ يظهر النصّ
 * داخله سطرًا بعد سطر، ويختم التوقيع الذهبي المشهد.
 */
export function InvitationClosing() {
  const reduced = useReducedMotion();

  return (
    <section aria-labelledby="closing-heading" className="closing">
      <motion.div
        className="closing__plate"
        initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 1.09, y: 26 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={VIEWPORT}
        transition={{ duration: 1.15, ease: EASE }}
      >
        <img src={SCENE.frame} alt="" aria-hidden="true" loading="lazy" />

        <div className="closing__inner">
          <Reveal kind="carve" delay={0.35} duration={0.9}>
            <p id="closing-heading" className="closing__primary balance">
              {INVITATION.closing.primary}
            </p>
          </Reveal>

          <Reveal
            kind="draw"
            delay={0.55}
            duration={0.9}
            style={{ display: 'flex', justifyContent: 'center', margin: '12px 0' }}
          >
            <LeafDivider width={190} />
          </Reveal>

          <Reveal kind="rise" delay={0.7}>
            <p className="closing__secondary balance">{INVITATION.closing.secondary}</p>
          </Reveal>

          <Reveal kind="bloom" delay={0.9} duration={0.9}>
            <p className="closing__monogram">{coupleTitle}</p>
          </Reveal>
        </div>
      </motion.div>
    </section>
  );
}
