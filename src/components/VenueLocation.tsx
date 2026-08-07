import { motion, useReducedMotion } from 'framer-motion';
import { INVITATION } from '../invitation.config';
import { AntiqueMap, BrassPin } from '../ornaments/AntiqueMap';
import { SectionHeading } from './SectionHeading';
import { Reveal, VIEWPORT } from './Reveal';
import { WoodCard } from './WoodCard';
import { BrassButton } from './BrassButton';

const { venue } = INVITATION;

interface Props {
  onOpenMap: () => void;
}

/** موقع القاعة: خريطة منقوشة، دبّوس ذهبي يهبط، ثمّ زرّ فتح الخرائط */
export function VenueLocation({ onOpenMap }: Props) {
  const reduced = useReducedMotion();

  return (
    <section aria-labelledby="venue-heading" className="section">
      <SectionHeading id="venue-heading" title={venue.heading} />

      <Reveal kind="depth" duration={0.85}>
        <WoodCard surface="dark">
          <div className="venue__map">
            <AntiqueMap style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />

            {/* ── الدبّوس يهبط بنابض ── */}
            <motion.div
              aria-hidden="true"
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: -48, scale: 0.7 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={VIEWPORT}
              transition={{ type: 'spring', stiffness: 210, damping: 15, delay: 0.42 }}
              style={{
                position: 'absolute',
                top: '18%',
                left: '50%',
                marginLeft: -26,
                width: 52,
                pointerEvents: 'none',
                filter: 'drop-shadow(0 8px 12px rgba(0,0,0,.6))',
              }}
            >
              <BrassPin size={52} />
            </motion.div>

            <Reveal kind="rise" delay={0.75} className="venue__plate">
              <span>{venue.name}</span>
            </Reveal>
          </div>

          <p className="venue__coords">
            <span aria-hidden="true" style={{ display: 'flex' }}>
              <BrassPin size={15} />
            </span>
            <span>
              {venue.latitude}, {venue.longitude}
            </span>
          </p>

          <Reveal kind="rise" delay={0.2} style={{ marginTop: 14 }}>
            <BrassButton
              ariaLabel={`${venue.buttonLabel} في تطبيق الخرائط`}
              onClick={onOpenMap}
              icon={<CompassGlyph />}
            >
              {venue.buttonLabel}
            </BrassButton>
          </Reveal>
        </WoodCard>
      </Reveal>
    </section>
  );
}

function CompassGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M16.5 3.5L11.8 16.2c-.2.6-1 .6-1.2 0L9 11 3.8 9.4c-.6-.2-.6-1 0-1.2L16.5 3.5z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}
