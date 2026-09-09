import { motion } from 'framer-motion';
import { INVITATION } from '../invitation.config';
import { THEME_ASSET } from './ThemeArt';

interface Props { playing: boolean; onToggle: () => void; visible: boolean }

export function AudioController({ playing, onToggle, visible }: Props) {
  const label = playing ? INVITATION.audio.pauseLabel : INVITATION.audio.playLabel;
  return (
    <motion.button type="button" onClick={onToggle} aria-label={label} title={label} aria-pressed={playing}
      className="gramophone-control" data-playing={playing || undefined} initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 18 }} transition={{ duration: .45 }}
      whileTap={{ scale: .96 }} style={{ pointerEvents: visible ? 'auto' : 'none' }}>
      <img src={`${THEME_ASSET}/03-gramophone-music.webp`} alt="" aria-hidden="true" width="640" height="640" />
      <span className="gramophone-control__record" aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </motion.button>
  );
}
