import { INVITATION } from '../invitation.config';
import { Reveal } from './Reveal';
import { THEME_ASSET } from './ThemeArt';

interface Props { onOpenMap: () => void }

export function VenueLocation({ onOpenMap }: Props) {
  return (
    <section aria-labelledby="venue-heading" className="venue-story">
      <Reveal kind="rise" duration={1}>
        <div className="venue-arch">
          <img src={`${THEME_ASSET}/10-venue-arch.webp`} alt="" aria-hidden="true" loading="lazy" width="1120" height="840" />
          <div className="venue-arch__content">
            <p>موعدنا في</p>
            <h2 id="venue-heading">قاعة القصر الذهبي 1</h2>
            <span>دورا</span>
            <button type="button" onClick={onOpenMap} aria-label={`${INVITATION.venue.buttonLabel} في خرائط Google`}>
              {INVITATION.venue.buttonLabel}
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
