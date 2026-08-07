import { useId } from 'react';
import type { CSSProperties } from 'react';

interface OrnamentProps {
  width?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * تدرّج ذهب الشامبانيا المشترك — يُعرَّف داخل كل SVG بمعرّف فريد.
 * الطرفان فاتحان والوسط داكن عمدًا: الزخرفة تقع على عاج، والذهب الفاتح
 * وحده يذوب فيه فلا يُقرأ الخطّ الرفيع.
 */
function BrassGradient({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#e3c288" />
        <stop offset="34%" stopColor="#c79c50" />
        <stop offset="66%" stopColor="#8f6a2b" />
        <stop offset="100%" stopColor="#d9b675" />
      </linearGradient>
    </defs>
  );
}

/**
 * فاصل ذهبي رفيع — خطّان يتناقصان نحو ماسة مركزية.
 * كل الرسم مسارات مفتوحة، فيمكن «رسمه» بحركة stroke-dashoffset.
 */
export function Flourish({ width = 200, className, style }: OrnamentProps) {
  const id = useId();

  return (
    <svg
      viewBox="0 0 200 18"
      width={width}
      height={(width * 18) / 200}
      className={className}
      style={style}
      aria-hidden="true"
      fill="none"
    >
      <BrassGradient id={id} />
      <g stroke={`url(#${id})`} strokeWidth="1.1" strokeLinecap="round">
        <path d="M6 9h58" />
        <path d="M136 9h58" />
        <path d="M64 9c6 0 9-4 15-4s9 4 15 4" />
        <path d="M136 9c-6 0-9 4-15 4s-9-4-15-4" />
        <path d="M94 9h12" />
      </g>
      <g fill={`url(#${id})`}>
        <path d="M100 3.6l3.4 5.4-3.4 5.4-3.4-5.4z" />
        <circle cx="70" cy="9" r="1.3" />
        <circle cx="130" cy="9" r="1.3" />
      </g>
    </svg>
  );
}

/**
 * فاصل أعرض بورقتين ذهبيتين وماسة — لرؤوس الأقسام.
 */
export function LeafDivider({ width = 230, className, style }: OrnamentProps) {
  const id = useId();

  return (
    <svg
      viewBox="0 0 230 26"
      width={width}
      height={(width * 26) / 230}
      className={className}
      style={style}
      aria-hidden="true"
      fill="none"
    >
      <BrassGradient id={id} />
      <g stroke={`url(#${id})`} strokeWidth="1.1" strokeLinecap="round">
        <path d="M8 13h64" />
        <path d="M158 13h64" />
        <path d="M72 13c8 0 12-6 20-6" />
        <path d="M158 13c-8 0-12 6-20 6" />
      </g>
      <g fill={`url(#${id})`} opacity="0.95">
        {/* ورقتان متقابلتان */}
        <path d="M92 13c0-5 5-8 11-8-1 5-5 8-11 8z" />
        <path d="M92 13c0 5 5 8 11 8-1-5-5-8-11-8z" />
        <path d="M138 13c0-5-5-8-11-8 1 5 5 8 11 8z" />
        <path d="M138 13c0 5-5 8-11 8 1-5 5-8 11-8z" />
        {/* ماسة مركزية مزدوجة */}
        <path d="M115 4.5l4.6 8.5-4.6 8.5-4.6-8.5z" />
        <circle cx="115" cy="13" r="1.6" fill="#fffdf8" />
      </g>
    </svg>
  );
}

/**
 * تاج الأسماء: العلامة «&» بين ذراعين محفورتين.
 * يُستعمل بين اسمي العروسين، ويُرسم بحركة تنطلق من المركز.
 */
export function CoupleCrest({
  width = 300,
  symbol = '&',
  className,
  style,
}: OrnamentProps & { symbol?: string }) {
  const id = useId();

  return (
    <svg
      viewBox="0 0 300 44"
      width={width}
      height={(width * 44) / 300}
      className={className}
      style={style}
      aria-hidden="true"
      fill="none"
    >
      <BrassGradient id={id} />
      <g stroke={`url(#${id})`} strokeWidth="1.2" strokeLinecap="round">
        <path d="M14 22h74" />
        <path d="M212 22h74" />
        <path d="M88 22c9 0 13-7 22-7s13 7 12 7" />
        <path d="M212 22c-9 0-13 7-22 7s-13-7-12-7" />
      </g>
      <g fill={`url(#${id})`}>
        <circle cx="96" cy="22" r="1.8" />
        <circle cx="204" cy="22" r="1.8" />
        <path d="M124 15.5l3 6.5-3 6.5-3-6.5z" />
        <path d="M176 15.5l3 6.5-3 6.5-3-6.5z" />
      </g>
      <text
        x="150"
        y="22"
        textAnchor="middle"
        dominantBaseline="central"
        fill={`url(#${id})`}
        style={{ fontFamily: 'var(--font-latin)', fontSize: 30, fontWeight: 600 }}
      >
        {symbol}
      </text>
    </svg>
  );
}
