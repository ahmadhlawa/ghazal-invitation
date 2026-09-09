import { INVITATION } from '../invitation.config';
import { Reveal } from './Reveal';
import { BirdFlock, BotanicalGarland, GoldDivider } from './ThemeArt';

export function InvitationClosing() {
  return (
    <footer className="storybook-closing" aria-labelledby="closing-heading">
      <BirdFlock className="storybook-closing__flock" />
      <Reveal kind="rise" duration={.9}>
        <p id="closing-heading" className="storybook-closing__primary">{INVITATION.closing.primary}</p>
        <GoldDivider />
        <p className="storybook-closing__secondary">{INVITATION.closing.secondary}</p>
        <p className="storybook-closing__names" dir="ltr">yousef + ghazal</p>
      </Reveal>
      <BotanicalGarland className="storybook-closing__garland" />
    </footer>
  );
}
