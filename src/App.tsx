import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { INVITATION } from './invitation.config';
import { GateEntrance } from './components/GateEntrance';
import { HillHero } from './components/HillHero';
import { InvitationLine } from './components/InvitationLine';
import { WeddingCountdown } from './components/WeddingCountdown';
import { EventsTimeline } from './components/EventsTimeline';
import { ArabicCalendar } from './components/ArabicCalendar';
import { VenueLocation } from './components/VenueLocation';
import { ShareInvitation } from './components/ShareInvitation';
import { InvitationClosing } from './components/InvitationClosing';
import { AudioController } from './components/AudioController';
import { Toast } from './components/Toast';
import { Particles } from './ornaments/Particles';
import { LeafDivider } from './ornaments/Ornament';
import { Reveal } from './components/Reveal';
import { GATE_OPEN_MS, GATE_OPEN_REDUCED_MS } from './motion';
import { useAudioController } from './hooks/useAudioController';
import { useToast } from './hooks/useToast';

interface ContentProps {
  onCalendar: (ok: boolean) => void;
  onCopied: (ok: boolean) => void;
  onOpenMap: () => void;
}

/**
 * محتوى الدعوة أسفل التلّة.
 *
 * مركَّب منذ أول تصيير — قبل فتح البوّابة — ومخفيّ خلفها فقط. وهو memo
 * برفقة نداءات ثابتة (useCallback) حتى لا يُعاد تصيير هذه الشجرة عند
 * تبديل حالة الفتح في منتصف حركة ثقيلة.
 */
const InvitationBody = memo(function InvitationBody({
  onCalendar,
  onCopied,
  onOpenMap,
}: ContentProps) {
  return (
    <main className="content">
      <InvitationLine />
      <WeddingCountdown />
      <EventsTimeline />
      <ArabicCalendar onResult={onCalendar} />
      <VenueLocation onOpenMap={onOpenMap} />

      <Reveal kind="draw" className="section-rule" duration={0.9}>
        <LeafDivider width={210} />
      </Reveal>

      <ShareInvitation onCopied={onCopied} />
      <InvitationClosing />
    </main>
  );
});

export default function App() {
  const reduced = useReducedMotion();
  const [opened, setOpened] = useState(false);
  const [openDone, setOpenDone] = useState(false);
  const timer = useRef<number | null>(null);

  const { message, visible: toastVisible, show: showToast } = useToast();
  const { audioRef, playing, play, toggle } = useAudioController(() =>
    showToast(INVITATION.toasts.audioFail)
  );

  /**
   * قفل التمرير حتى تنتهي حركة البوّابة.
   * scrollbar-gutter: stable في global.css يحجز مكان الشريط دائمًا، فلا
   * يتغيّر عرض الصفحة عند رفع القفل ولا تقع إزاحة تخطيط.
   */
  useEffect(() => {
    document.documentElement.style.overflow = openDone ? '' : 'hidden';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [openDone]);

  /* تحميل الخطوط العربية مبكرًا: البوّابة والأسماء تستعمل Aref Ruqaa و
     Amiri، ولو تأخّر تحميلهما لوقع تبديل الخط في منتصف تسلسل الأسماء. */
  useEffect(() => {
    const fonts = [
      '700 64px "Aref Ruqaa"',
      '400 18px Amiri',
      '600 64px "Cormorant Garamond"',
      '400 14px Tajawal',
    ];
    fonts.forEach((f) => {
      void document.fonts.load(f).catch(() => undefined);
    });
  }, []);

  useEffect(
    () => () => {
      if (timer.current !== null) window.clearTimeout(timer.current);
    },
    []
  );

  const openGate = useCallback(() => {
    setOpened((was) => {
      if (was) return was;

      /* الحركة تبدأ فورًا؛ الصوت يُشغَّل في الإطار التالي حتى لا يعطّل
         تهيئةُ عنصر الصوت أول إطار من التسلسل. */
      requestAnimationFrame(() => void play());
      timer.current = window.setTimeout(
        () => setOpenDone(true),
        reduced ? GATE_OPEN_REDUCED_MS : GATE_OPEN_MS
      );
      return true;
    });
  }, [play, reduced]);

  const handleCalendar = useCallback(
    (ok: boolean) => showToast(ok ? INVITATION.toasts.calendarOk : INVITATION.toasts.calendarFail),
    [showToast]
  );
  const handleCopied = useCallback(
    (ok: boolean) => showToast(ok ? INVITATION.toasts.copyOk : INVITATION.toasts.copyFail),
    [showToast]
  );
  const handleOpenMap = useCallback(
    () => window.open(INVITATION.venue.mapsUrl, '_blank', 'noopener,noreferrer'),
    []
  );

  return (
    <div lang="ar" dir="rtl" className="stage" data-open={opened || undefined}>
      {/* ── لوح الدعوة المركزي بعرض هاتف ── */}
      <div className="shell">
        <div aria-hidden="true" className="shell__frame" />

        {/* بتلات خفيفة تعبر بين الأقسام — بعد انتهاء البوّابة فقط */}
        {openDone && <Particles count={5} variant="petal" peak={0.35} fixed />}

        {/* المشهد الثالث: التلّة والأسماء — يبدأ مع انفتاح البوّابة */}
        <HillHero play={opened} />

        <InvitationBody
          onCalendar={handleCalendar}
          onCopied={handleCopied}
          onOpenMap={handleOpenMap}
        />

        <AudioController playing={playing} onToggle={toggle} visible={openDone} />
        <Toast message={message} visible={toastVisible} />

        {/* preload=metadata: لا نُنزّل المقطع كاملًا قبل الحاجة، ولا نزاحم
            أصول البوّابة على عرض النطاق لحظة الضغط */}
        <audio ref={audioRef} src={INVITATION.audio.src} preload="metadata" loop />
      </div>

      <GateEntrance open={opened} done={openDone} onOpen={openGate} />
    </div>
  );
}
