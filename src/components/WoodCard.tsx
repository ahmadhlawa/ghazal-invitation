import type { CSSProperties, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  /** المناسبة الكبرى: إطار شامبانيا وتوهّج خفيف */
  primary?: boolean;
  /** قلب البطاقة: عاج ناصع للنصوص الطويلة، أو كريم غائر للأرقام والشبكات */
  surface?: 'light' | 'dark';
  className?: string;
  style?: CSSProperties;
}

/**
 * بطاقة عاجية محفورة: إطار عاج بحزّ ذهبي، وقلب ناصع أو غائر حسب ما
 * يحتضنه. هي السطح الوحيد المستعمل لكل محتوى الدعوة،
 * فلا تتناثر خلفيات مختلفة بين الأقسام.
 */
export function WoodCard({ children, primary, surface = 'light', className, style }: Props) {
  return (
    <div className={`wood-card${primary ? ' wood-card--primary' : ''}${className ? ` ${className}` : ''}`} style={style}>
      <div className={surface === 'light' ? 'wood-card__surface' : 'wood-card__dark'}>{children}</div>
    </div>
  );
}
