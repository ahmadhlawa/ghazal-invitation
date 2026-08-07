import { useId } from 'react';
import type { CSSProperties } from 'react';

/**
 * خريطة منقوشة على لوح عاجي — طرقات ذهبية وكتل مبانٍ محفورة.
 * تمثيل زخرفي لا خريطة حقيقية: الإحداثيات والرابط الفعلي في زرّ الموقع.
 */
export function AntiqueMap({ style }: { style?: CSSProperties }) {
  const id = useId();

  return (
    <svg viewBox="0 0 320 214" preserveAspectRatio="xMidYMid slice" style={style} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-brass`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c79c50" />
          <stop offset="100%" stopColor="#8f6a2b" />
        </linearGradient>
        <radialGradient id={`${id}-warm`} cx="50%" cy="34%" r="70%">
          <stop offset="0%" stopColor="#fffdf8" />
          <stop offset="100%" stopColor="#f1e7d8" />
        </radialGradient>
      </defs>

      <rect width="320" height="214" fill={`url(#${id}-warm)`} />

      {/* شبكة خفيفة محفورة */}
      <g stroke="#a2762f" strokeWidth="0.5" opacity="0.22">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="214" />
        ))}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <line key={`h${i}`} x1="0" y1={i * 40} x2="320" y2={i * 40} />
        ))}
      </g>

      {/* كتل مبانٍ */}
      <g fill="#e7d9c5" opacity="0.9">
        <rect x="22" y="26" width="52" height="34" rx="3" />
        <rect x="96" y="18" width="38" height="26" rx="3" />
        <rect x="238" y="34" width="56" height="30" rx="3" />
        <rect x="30" y="140" width="46" height="38" rx="3" />
        <rect x="236" y="148" width="58" height="34" rx="3" />
        <rect x="120" y="164" width="40" height="30" rx="3" />
      </g>

      {/* طرقات ذهبية */}
      <g stroke={`url(#${id}-brass)`} fill="none" strokeLinecap="round">
        <path d="M-4 132h120l38-34h74l96-30" strokeWidth="5" opacity="0.75" />
        <path d="M154 214V98" strokeWidth="4" opacity="0.6" />
        <path d="M-4 76h84l34 22" strokeWidth="2.6" opacity="0.45" />
        <path d="M324 176H206l-30-24" strokeWidth="2.6" opacity="0.45" />
      </g>

      {/* مساحة خضراء منقوشة */}
      <g fill="#dcd0b4" opacity="0.7">
        <ellipse cx="70" cy="96" rx="34" ry="18" />
        <ellipse cx="262" cy="110" rx="30" ry="16" />
      </g>

      {/* حلقات دلالة حول الموقع */}
      <g stroke="#a2762f" fill="none" opacity="0.5">
        <circle cx="160" cy="88" r="26" strokeWidth="0.8" strokeDasharray="4 5" />
        <circle cx="160" cy="88" r="42" strokeWidth="0.6" strokeDasharray="2 7" />
      </g>
    </svg>
  );
}

/** دبّوس ذهبي مطروق بقلب عاجي */
export function BrassPin({ size = 52 }: { size?: number }) {
  const id = useId();

  return (
    <svg viewBox="0 0 54 70" width={size} height={(size * 70) / 54} aria-hidden="true">
      <defs>
        <radialGradient id={`${id}-body`} cx="34%" cy="24%" r="78%">
          <stop offset="0%" stopColor="#fdf2da" />
          <stop offset="46%" stopColor="#ddbb7f" />
          <stop offset="100%" stopColor="#8f6a2b" />
        </radialGradient>
      </defs>
      <path
        d="M27 68c-1.5-6-6-12-11-19C11 42 6 34 6 25 6 12.8 15.4 3 27 3s21 9.8 21 22c0 9-5 17-10 24-5 7-9.5 13-11 19z"
        fill={`url(#${id}-body)`}
      />
      <circle cx="27" cy="24" r="13.5" fill="#fffdf8" />
      <circle cx="27" cy="24" r="13.5" fill="none" stroke="#a2762f" strokeWidth="1" strokeOpacity="0.5" />
      {/* غصن محفور داخل الدبّوس */}
      <g stroke="#a2762f" strokeWidth="1.3" strokeLinecap="round" fill="none">
        <path d="M27 32V17" />
        <path d="M27 22c-3.4-2.4-6.4-1.8-8-5.4 4-1.2 7 .6 8 3.6zM27 22c3.4-2.4 6.4-1.8 8-5.4-4-1.2-7 .6-8 3.6z" />
        <path d="M27 28c-3.4-2.4-6.4-1.8-8-5.4 4-1.2 7 .6 8 3.6zM27 28c3.4-2.4 6.4-1.8 8-5.4-4-1.2-7 .6-8 3.6z" />
      </g>
      <ellipse cx="18" cy="13" rx="7" ry="4" fill="#ffffff" opacity="0.55" transform="rotate(-28 18 13)" />
    </svg>
  );
}
