import { motion, useReducedMotion } from 'framer-motion';
import { INVITATION, type InvitationEvent } from '../invitation.config';
import { EventGlyph } from '../ornaments/EventIcons';
import { Flourish } from '../ornaments/Ornament';
import { SectionHeading } from './SectionHeading';
import { WoodCard } from './WoodCard';
import { VIEWPORT } from './Reveal';

const EASE = [0.16, 1, 0.3, 1] as const;

/** خطّ ذهبي يُرسم من المركز نحو طرف البطاقة */
function Rule({ side, delay, reduced }: { side: 'r' | 'l'; delay: number; reduced: boolean | null }) {
  return (
    <motion.span
      aria-hidden="true"
      className={`event__rule event__rule--${side}`}
      initial={reduced ? { opacity: 0 } : { opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.7, delay, ease: EASE }}
      /* ينمو من الطرف الداخلي (جهة الميدالية) نحو حافّة البطاقة */
      style={{ transformOrigin: side === 'r' ? 'left' : 'right' }}
    />
  );
}

/**
 * بطاقة مناسبة واحدة.
 *
 * ثلاث حركات متمايزة تتعاقب داخل البطاقة الواحدة: اللوح يرتفع بميل
 * (عمق)، والميدالية تتفتّح بنابض، والرأس ينساب من جهة اليمين — فلا
 * تبدو البطاقات كأنها نسخة واحدة تتكرّر.
 */
function EventCard({ event, index }: { event: InvitationEvent; index: number }) {
  const reduced = useReducedMotion();
  const base = index * 0.14;

  return (
    <motion.li
      className={`event${event.primary ? ' event--primary' : ''}`}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 46, rotateX: 9, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.85, delay: base, ease: EASE }}
      style={{ transformPerspective: 900 }}
    >
      <WoodCard primary={event.primary}>
        <div className="event__head">
          <Rule side="r" delay={base + 0.36} reduced={reduced} />

          <motion.span
            aria-hidden="true"
            className="event__medal"
            initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.5, rotate: -22 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={VIEWPORT}
            transition={{ type: 'spring', stiffness: 230, damping: 18, delay: base + 0.26 }}
          >
            <EventGlyph name={event.icon} size={event.primary ? 30 : 27} />
          </motion.span>

          <motion.span
            className="event__date"
            initial={reduced ? { opacity: 0 } : { opacity: 0, x: 26 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.7, delay: base + 0.18, ease: EASE }}
          >
            <span className="event__weekday">{event.weekday}</span>
            <span className="event__day">{event.date}</span>
          </motion.span>

          <Rule side="l" delay={base + 0.36} reduced={reduced} />
        </div>

        <motion.div
          className="event__body"
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.7, delay: base + 0.32, ease: EASE }}
        >
          <h3 className="event__title">{event.title}</h3>
          <p className="event__place">{event.place}</p>
          {event.details.map((line) => (
            <p key={line} className="event__detail">
              {line}
            </p>
          ))}
        </motion.div>

        <motion.div
          aria-hidden="true"
          className="event__flourish"
          initial={reduced ? { opacity: 0 } : { opacity: 0, scaleX: 0.1 }}
          whileInView={{ opacity: 0.7, scaleX: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.8, delay: base + 0.44, ease: EASE }}
          style={{ transformOrigin: 'center' }}
        >
          <Flourish width={event.primary ? 180 : 150} />
        </motion.div>
      </WoodCard>
    </motion.li>
  );
}

/** الخطّ الزمني الكامل للمناسبات */
export function EventsTimeline() {
  return (
    <section aria-labelledby="events-heading" className="section">
      <SectionHeading id="events-heading" title={INVITATION.eventsHeading} />

      <ul className="timeline">
        {INVITATION.events.map((event, i) => (
          <EventCard key={event.id} event={event} index={i} />
        ))}
      </ul>
    </section>
  );
}
