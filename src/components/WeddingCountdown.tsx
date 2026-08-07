import { memo, useEffect, useRef, useState } from 'react';
import { INVITATION } from '../invitation.config';
import { Flourish } from '../ornaments/Ornament';
import { Reveal } from './Reveal';
import { WoodCard } from './WoodCard';

/**
 * لحظة الزفاف بإزاحة زمنية صريحة (+03:00) — تُقرأ مرة واحدة من الإعدادات.
 * الإزاحة الصريحة تجعل الهدف لحظةً مطلقة، فينتهي العدّ في وقته بتوقيت
 * فلسطين مهما كانت المنطقة الزمنية للزائر.
 */
const TARGET = new Date(INVITATION.wedding.dateTime).getTime();

interface Remaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
}

const ZERO: Remaining = { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };

/**
 * تُحسب المدّة من الساعة الحالية في كل نبضة — لا نُنقص عدّادًا مخزّنًا.
 * لذلك تبقى دقيقة إن نام التبويب ثم عاد، ولا تظهر قيم سالبة أبدًا.
 */
function remainingFrom(now: number): Remaining {
  const diff = TARGET - now;
  if (!Number.isFinite(diff) || diff <= 0) return ZERO;

  const total = Math.floor(diff / 1000);
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
    done: false,
  };
}

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * ميدالية وحدة واحدة — memo فتُعاد تصييرها فقط حين يتغيّر رقمها هي.
 * أي أن نبضة الثانية لا تمسّ الأيام والساعات والدقائق.
 */
const CountdownUnit = memo(function CountdownUnit({ value, label }: { value: string; label: string }) {
  return (
    <div className="count__unit">
      <span className="count__value brass-text">{value}</span>
      <span className="count__label">{label}</span>
    </div>
  );
});

/**
 * الجزء النابض وحده — الحالة محبوسة هنا، فلا يُعاد تصيير الدعوة كلّها
 * (ولا أغلفة الظهور) كل ثانية.
 */
function CountdownBody() {
  const { labels, doneMessage } = INVITATION.countdown;
  const [left, setLeft] = useState(() => remainingFrom(Date.now()));
  const stopped = useRef(left.done);

  useEffect(() => {
    if (stopped.current) return;

    let id = 0;
    const tick = () => {
      const next = remainingFrom(Date.now());
      setLeft(next);
      if (next.done) {
        stopped.current = true;
        window.clearInterval(id);
      }
    };

    id = window.setInterval(tick, 1000);

    /* عودة التبويب من الخلفية: نُحدّث فورًا بدل انتظار النبضة التالية */
    const onVisible = () => {
      if (document.visibilityState === 'visible' && !stopped.current) tick();
    };
    document.addEventListener('visibilitychange', onVisible);

    return () => {
      window.clearInterval(id);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, []);

  if (left.done) {
    return <p className="count__done brass-text">{doneMessage}</p>;
  }

  return (
    <div role="timer" aria-live="off" className="count">
      <CountdownUnit value={String(left.days)} label={labels.days} />
      <CountdownUnit value={pad(left.hours)} label={labels.hours} />
      <CountdownUnit value={pad(left.minutes)} label={labels.minutes} />
      <CountdownUnit value={pad(left.seconds)} label={labels.seconds} />
    </div>
  );
}

/**
 * العدّ التنازلي حتى موعد الزفاف — القشرة ثابتة لا تُعاد تصييرها،
 * والحركة عند الوصول إلى الشاشة تقع مرّة واحدة فقط.
 */
export function WeddingCountdown() {
  const { heading } = INVITATION.countdown;

  return (
    <section aria-label={heading} className="section section--tight">
      <Reveal kind="depth" duration={0.85}>
        <WoodCard surface="dark">
          <Reveal kind="carve" delay={0.14} duration={0.8}>
            <h2 className="cal__month brass-text">{heading}</h2>
          </Reveal>

          <Reveal
            kind="draw"
            delay={0.26}
            duration={0.85}
            style={{ display: 'flex', justifyContent: 'center', margin: '2px 0 13px', opacity: 0.85 }}
          >
            <Flourish width={170} />
          </Reveal>

          <CountdownBody />
        </WoodCard>
      </Reveal>
    </section>
  );
}
