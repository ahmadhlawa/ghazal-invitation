import { motion, useReducedMotion, type TargetAndTransition, type Variants } from 'framer-motion';
import type { CSSProperties, ReactNode } from 'react';

export const VIEWPORT = { once: true, amount: 0.2, margin: '0px 0px -8% 0px' } as const;

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * لغة حركة واحدة، مفردات متعدّدة.
 *
 * الأقسام لا تستعمل «تلاشيًا صاعدًا» موحّدًا: البطاقات ترتفع بعمق،
 * والعناوين تنكشف من خلف قناع، والزخارف تُرسم من المركز، والتفاصيل
 * تنساب من الجانب. كلّها بالمنحنى نفسه فتبقى الحركة عائلة واحدة.
 */
export type RevealKind = 'rise' | 'depth' | 'carve' | 'draw' | 'drift-r' | 'drift-l' | 'bloom';

const KINDS: Record<RevealKind, { hidden: TargetAndTransition; show: TargetAndTransition }> = {
  /* ارتفاع بسيط — للفقرات والتفاصيل */
  rise: { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0 } },
  /* ارتفاع بعمق — للبطاقات المحفورة: تميل ثمّ تستوي */
  depth: {
    hidden: { opacity: 0, y: 46, rotateX: 9, scale: 0.96 },
    show: { opacity: 1, y: 0, rotateX: 0, scale: 1 },
  },
  /**
   * انكشاف من خلف قناع — للعناوين المحفورة.
   *
   * القناع حاوية overflow: hidden والنصّ يصعد داخلها، لا clip-path:
   * المتصفح يختزل inset(0% 0% 100% 0%) إلى ثلاث قيم، فيختلف تركيب
   * قيمتَي البداية والنهاية وتسقط الحركة كلّها — ويبقى العنصر مخفيًا.
   */
  carve: { hidden: { opacity: 0, y: '108%' }, show: { opacity: 1, y: '0%' } },
  /* رسم من المركز نحو الطرفين — للفواصل والزخارف */
  draw: { hidden: { opacity: 0, scaleX: 0.08 }, show: { opacity: 1, scaleX: 1 } },
  /* انسياب من اليمين / اليسار */
  'drift-r': { hidden: { opacity: 0, x: 34 }, show: { opacity: 1, x: 0 } },
  'drift-l': { hidden: { opacity: 0, x: -34 }, show: { opacity: 1, x: 0 } },
  /* تفتّح من نقطة — للميداليات والأختام */
  bloom: { hidden: { opacity: 0, scale: 0.6 }, show: { opacity: 1, scale: 1 } },
};

/** المتغيّرات الجاهزة لنوع حركة */
function useRevealVariants(kind: RevealKind, duration = 0.8, delay = 0): Variants {
  const reduced = useReducedMotion();

  if (reduced) {
    return {
      hidden: { opacity: 0 },
      show: { opacity: 1, transition: { duration: 0.32, delay: Math.min(delay, 0.15) } },
    };
  }

  const spec = KINDS[kind];
  return {
    hidden: spec.hidden,
    show: { ...spec.show, transition: { duration, delay, ease: EASE } },
  };
}

interface RevealProps {
  children: ReactNode;
  kind?: RevealKind;
  delay?: number;
  duration?: number;
  className?: string;
  style?: CSSProperties;
  as?: 'div' | 'section' | 'li' | 'p' | 'span' | 'ul';
}

/** غلاف ظهور عند وصول العنصر إلى الشاشة — يعمل مرّة واحدة فقط */
export function Reveal({
  children,
  kind = 'rise',
  delay = 0,
  duration = 0.8,
  className,
  style,
  as = 'div',
}: RevealProps) {
  const variants = useRevealVariants(kind, duration, delay);
  const Tag = motion[as];

  /* «carve» يحتاج حاوية قاصّة والنصّ يصعد داخلها — والحشوة السفلية
     تترك متّسعًا لنزول حروف الخط الرقعي تحت خطّ الأساس. */
  if (kind === 'carve') {
    return (
      <Tag
        className={className}
        style={{ overflow: 'hidden', paddingBottom: '0.16em', ...style }}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        variants={{ hidden: {}, show: {} }}
      >
        <motion.div variants={variants}>{children}</motion.div>
      </Tag>
    );
  }

  return (
    <Tag
      className={className}
      style={
        kind === 'draw'
          ? { transformOrigin: 'center', ...style }
          : kind === 'depth'
            ? { transformPerspective: 900, ...style }
            : style
      }
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {children}
    </Tag>
  );
}

/** حاوية تتابعية: تُظهر أبناءها بفارق زمني منتظم */
export function RevealGroup({
  children,
  stagger = 0.12,
  delayChildren = 0,
  className,
  style,
  as = 'div',
}: {
  children: ReactNode;
  stagger?: number;
  delayChildren?: number;
  className?: string;
  style?: CSSProperties;
  as?: 'div' | 'ul';
}) {
  const reduced = useReducedMotion();
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      style={style}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: reduced ? 0 : stagger,
            delayChildren: reduced ? 0 : delayChildren,
          },
        },
      }}
    >
      {children}
    </Tag>
  );
}

/** عنصر داخل RevealGroup — يرث توقيت الأب */
export function RevealItem({
  children,
  kind = 'rise',
  duration = 0.72,
  className,
  style,
  as = 'div',
}: {
  children: ReactNode;
  kind?: RevealKind;
  duration?: number;
  className?: string;
  style?: CSSProperties;
  as?: 'div' | 'li' | 'span';
}) {
  const variants = useRevealVariants(kind, duration);
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      style={
        kind === 'draw'
          ? { transformOrigin: 'center', ...style }
          : kind === 'depth'
            ? { transformPerspective: 900, ...style }
            : style
      }
      variants={variants}
    >
      {children}
    </Tag>
  );
}
