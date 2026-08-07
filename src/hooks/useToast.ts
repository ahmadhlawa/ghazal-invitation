import { useCallback, useEffect, useRef, useState } from 'react';

/** رسائل عربية قصيرة تظهر أسفل الشاشة ثم تختفي تلقائيًا */
export function useToast(duration = 2400) {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const timer = useRef<number | null>(null);

  const show = useCallback(
    (text: string) => {
      setMessage(text);
      setVisible(true);
      if (timer.current) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setVisible(false), duration);
    },
    [duration]
  );

  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current);
    },
    []
  );

  return { message, visible, show };
}
