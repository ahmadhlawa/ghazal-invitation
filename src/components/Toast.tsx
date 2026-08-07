import { AnimatePresence, motion } from 'framer-motion';

interface Props {
  message: string;
  visible: boolean;
}

/** إشعار عربي قصير أسفل الشاشة — لوح عاجي صغير بحافّة ذهبية */
export function Toast({ message, visible }: Props) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="status"
          aria-live="polite"
          className="toast"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.28 }}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
