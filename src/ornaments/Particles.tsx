import { useMemo } from 'react';
import { useReducedMotion } from 'framer-motion';
import type { CSSProperties } from 'react';

interface Props {
  /** عدد الجزيئات — يبقى صغيرًا حفاظًا على أداء الهاتف */
  count?: number;
  /** بتلات ورد أو غبار ذهبي متلألئ في ضوء الفوانيس */
  variant?: 'petal' | 'dust';
  /** أعلى شفافية تبلغها الجزيئة */
  peak?: number;
  /**
   * تثبيت الطبقة على الشاشة بدل حاويتها.
   * الحاوية الطويلة (اللوح كاملًا) تجعل مسار السقوط — وهو 112vh — يغطّي
   * أعلى الصفحة فقط؛ التثبيت يجعل البتلات تعبر بين الأقسام أثناء التمرير.
   */
  fixed?: boolean;
}

/**
 * طبقة جزيئات خفيفة: بتلات متساقطة أو غبار ذهبي.
 * كل الحركة على transform/opacity في CSS — لا مؤقّتات ولا إعادة تصيير.
 */
export function Particles({ count = 7, variant = 'petal', peak = 0.7, fixed }: Props) {
  const reduced = useReducedMotion();

  const items = useMemo(() => {
    // قيم ثابتة (لا عشوائية) حتى لا يختلف العرض بين التحديثات
    const seeds = [7, 23, 41, 58, 66, 79, 88, 14, 33, 50, 72, 95];
    return Array.from({ length: count }, (_, i) => {
      const s = seeds[i % seeds.length];
      const size = variant === 'dust' ? 3 + (i % 3) * 1.5 : 7 + (i % 4) * 2.5;
      return {
        style: {
          right: `${s}%`,
          width: size,
          height: variant === 'dust' ? size : size * 1.25,
          '--dur': `${(variant === 'dust' ? 20 : 15) + (i % 5) * 3}s`,
          '--delay': `${i * 2.4}s`,
          '--drift': `${i % 2 === 0 ? 26 + i * 3 : -(20 + i * 3)}px`,
          '--spin': `${i % 2 === 0 ? 320 : -280}deg`,
          '--peak': peak - (i % 3) * 0.14,
        } as CSSProperties,
      };
    });
  }, [count, variant, peak]);

  if (reduced) return null;

  return (
    <div aria-hidden="true" className={fixed ? 'particles particles--fixed' : 'particles'}>
      {items.map((it, i) => (
        <span key={i} className={`particle particle--${variant}`} style={it.style} />
      ))}
    </div>
  );
}
