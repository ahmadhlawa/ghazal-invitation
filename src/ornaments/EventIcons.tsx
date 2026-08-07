import type { EventIcon } from '../invitation.config';

interface Props {
  name: EventIcon;
  size?: number;
}

/**
 * أيقونات المناسبات — نقش ذهبي بخطوط currentColor فقط، فترث
 * لون الميدالية التي تحتضنها ولا تحمل ألوانًا خاصة بها.
 */
export function EventGlyph({ name, size = 28 }: Props) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 32 32',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };

  switch (name) {
    /* الحنّة: كفّ منقوش */
    case 'henna':
      return (
        <svg {...common}>
          <path d="M10 20V9.5a1.6 1.6 0 0 1 3.2 0V17" />
          <path d="M13.2 16V7.4a1.6 1.6 0 0 1 3.2 0V16" />
          <path d="M16.4 16.4V8.6a1.6 1.6 0 0 1 3.2 0V17" />
          <path d="M19.6 17v-4.6a1.5 1.5 0 0 1 3 0V21c0 4-2.9 6.6-6.6 6.6S9.4 25 9.4 21v-2.6" />
          <circle cx="16" cy="21.4" r="1.5" fill="currentColor" stroke="none" />
          <path d="M13.4 24.6h5.2" opacity="0.8" />
        </svg>
      );

    /* سهرة الرجال: دلّة قهوة */
    case 'men':
      return (
        <svg {...common}>
          <path d="M11 12h9a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4h-5a4 4 0 0 1-4-4z" />
          <path d="M11 15.5 5.5 11l6-1.5" />
          <path d="M20 13.5c3.4.6 4.6 2.6 4.6 4.6s-1.4 3.4-3.6 3.9" />
          <path d="M15 12V9.6c0-1 .8-1.6 1.6-1.6" />
          <path d="M13.5 27h8.4" />
        </svg>
      );

    /* سهرة النساء: زهرة متفتّحة */
    case 'women':
      return (
        <svg {...common}>
          <circle cx="16" cy="16" r="3.1" />
          <path d="M16 12.9c0-3.3 1.4-5.4 4.2-6.2-.5 3-1.9 5-4.2 6.2z" />
          <path d="M16 12.9c0-3.3-1.4-5.4-4.2-6.2.5 3 1.9 5 4.2 6.2z" />
          <path d="M19.1 16c3.3 0 5.4 1.4 6.2 4.2-3-.5-5-1.9-6.2-4.2z" />
          <path d="M12.9 16c-3.3 0-5.4 1.4-6.2 4.2 3-.5 5-1.9 6.2-4.2z" />
          <path d="M16 19.1c0 3.3 1.4 5.4 4.2 6.2-.5-3-1.9-5-4.2-6.2z" />
          <path d="M16 19.1c0 3.3-1.4 5.4-4.2 6.2.5-3 1.9-5 4.2-6.2z" />
        </svg>
      );

    /* الزفاف: خاتمان متشابكان */
    case 'rings':
    default:
      return (
        <svg {...common}>
          <circle cx="12.6" cy="19" r="6.4" />
          <circle cx="20.4" cy="19" r="6.4" />
          <path d="M20.4 9.2 22.6 6h-4.4z" fill="currentColor" />
          <path d="m18.2 6 2.2 3.2" opacity="0.8" />
        </svg>
      );
  }
}
