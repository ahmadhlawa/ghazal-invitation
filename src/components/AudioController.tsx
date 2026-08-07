import { motion } from 'framer-motion';
import { INVITATION } from '../invitation.config';

interface Props {
  playing: boolean;
  onToggle: () => void;
  visible: boolean;
}

/** قرص ذهبي عائم للتحكّم بالموسيقى — لا يغطّي المحتوى، وله تسميات عربية */
export function AudioController({ playing, onToggle, visible }: Props) {
  const label = playing ? INVITATION.audio.pauseLabel : INVITATION.audio.playLabel;

  return (
    <motion.button
      type="button"
      onClick={onToggle}
      aria-label={label}
      title={label}
      aria-pressed={playing}
      className="audio-btn"
      initial={false}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.8 }}
      transition={{ duration: 0.4 }}
      whileTap={{ scale: 0.92 }}
      style={{ pointerEvents: visible ? 'auto' : 'none' }}
    >
      {playing ? (
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
          <rect x="3" y="2" width="3.6" height="12" rx="1.2" fill="currentColor" />
          <rect x="9.4" y="2" width="3.6" height="12" rx="1.2" fill="currentColor" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M4 2.6c0-.9 1-1.4 1.7-.9l7.2 4.9c.7.5.7 1.5 0 1.9l-7.2 4.9c-.8.5-1.7 0-1.7-.9z" fill="currentColor" />
        </svg>
      )}
    </motion.button>
  );
}
