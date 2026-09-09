import { motion, useReducedMotion } from 'framer-motion';
import { INVITATION, type InvitationEvent } from '../invitation.config';
import { EventGlyph } from '../ornaments/EventIcons';
import { VIEWPORT } from './Reveal';
import { GoldDivider } from './ThemeArt';

function PhotographyNotice() {
  return (
    <div className="photography-note">
      <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M5 10h5l2-3h8l2 3h5v15H5zM11 17a5 5 0 1 0 10 0 5 5 0 0 0-10 0ZM4 4l24 24" /></svg>
      <span>يُمنع التصوير داخل قاعة النساء</span>
    </div>
  );
}

function EventScene({ event, index }: { event: InvitationEvent; index: number }) {
  const reduced = useReducedMotion();
  const isWomen = event.id === 'women-evening';
  return (
    <motion.li className={`event-scene ${event.primary ? 'event-scene--primary' : ''}`}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={VIEWPORT}
      transition={{ duration: .85, delay: index * .12, ease: [0.16, 1, 0.3, 1] }}>
      <span className="event-scene__sprig" aria-hidden="true" />
      <div className="event-scene__medallion" aria-hidden="true"><EventGlyph name={event.icon} size={29} /></div>
      <p className="event-scene__weekday">{event.weekday}</p>
      <time className="event-scene__date" dateTime={event.date.split(' / ').reverse().join('-')}>{event.date}</time>
      <h3>{event.title}</h3>
      <p className="event-scene__place">{event.place}</p>
      {event.details.filter(line => !line.includes('التصوير')).map(line => <p className="event-scene__detail" key={line}>{line}</p>)}
      {isWomen && <PhotographyNotice />}
    </motion.li>
  );
}

export function EventsTimeline() {
  return (
    <section aria-labelledby="events-heading" className="events-story">
      <p className="story-eyebrow">تفاصيل فرحتنا</p>
      <h2 id="events-heading">{INVITATION.eventsHeading}</h2>
      <GoldDivider />
      <ul className="events-story__list">{INVITATION.events.map((event, i) => <EventScene key={event.id} event={event} index={i} />)}</ul>
    </section>
  );
}
