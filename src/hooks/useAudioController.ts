import { useCallback, useEffect, useRef, useState } from 'react';
import { INVITATION } from '../invitation.config';

const FADE_STEP_MS = 90;

/**
 * يتحكم بالموسيقى: تشغيل بعد تفاعل المستخدم فقط، مع تلاشٍ تدريجي
 * للصوت عند التشغيل والإيقاف، ودون إعادة تشغيل المقطع من بدايته.
 */
export function useAudioController(onError?: () => void) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<number | null>(null);
  const [playing, setPlaying] = useState(false);

  const clearFade = useCallback(() => {
    if (fadeRef.current !== null) {
      window.clearInterval(fadeRef.current);
      fadeRef.current = null;
    }
  }, []);

  useEffect(() => clearFade, [clearFade]);

  const play = useCallback(async () => {
    const el = audioRef.current;
    if (!el) return;

    clearFade();
    // نستأنف من الموضع الحالي — لا نعيد ضبط currentTime
    el.volume = 0;
    try {
      await el.play();
    } catch {
      setPlaying(false);
      onError?.();
      return;
    }
    setPlaying(true);

    fadeRef.current = window.setInterval(() => {
      const a = audioRef.current;
      if (!a) return clearFade();
      const next = Math.min(INVITATION.audio.targetVolume, a.volume + 0.06);
      a.volume = next;
      if (next >= INVITATION.audio.targetVolume) clearFade();
    }, FADE_STEP_MS);
  }, [clearFade, onError]);

  const pause = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;

    clearFade();
    setPlaying(false);
    fadeRef.current = window.setInterval(() => {
      const a = audioRef.current;
      if (!a) return clearFade();
      const next = Math.max(0, a.volume - 0.1);
      a.volume = next;
      if (next <= 0) {
        clearFade();
        a.pause();
      }
    }, 60);
  }, [clearFade]);

  const toggle = useCallback(() => {
    if (playing) pause();
    else void play();
  }, [pause, play, playing]);

  return { audioRef, playing, play, pause, toggle };
}
