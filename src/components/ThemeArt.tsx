import type { CSSProperties, ReactNode } from 'react';

export const THEME_ASSET = '/assets/new-theme';

export function BotanicalGarland({ className = '' }: { className?: string }) {
  return <img className={`botanical-garland ${className}`} src={`${THEME_ASSET}/07-top-botanical-garland.webp`} alt="" aria-hidden="true" />;
}

export function GoldDivider({ className = '' }: { className?: string }) {
  return <img className={`gold-divider ${className}`} src={`${THEME_ASSET}/09-gold-divider.webp`} alt="" aria-hidden="true" loading="lazy" />;
}

interface BirdProps {
  direction?: 'left' | 'right';
  size?: number;
  duration?: number;
  delay?: number;
  top?: string;
  opacity?: number;
  path?: 'high' | 'low' | 'hover';
}

export function FlyingBird({ direction = 'right', size = 70, duration = 18, delay = 0, top = '25%', opacity = .72, path = 'high' }: BirdProps) {
  const style = { '--bird-size': `${size}px`, '--bird-duration': `${duration}s`, '--bird-delay': `${delay}s`, '--bird-top': top, '--bird-opacity': opacity } as CSSProperties;
  return (
    <span className={`flying-bird flying-bird--${direction} flying-bird--${path}`} style={style} aria-hidden="true">
      <img src={`${THEME_ASSET}/${direction === 'right' ? '04-bird-right.webp' : '05-bird-left.webp'}`} alt="" />
    </span>
  );
}

export function AmbientBirdLayer({ compact = false }: { compact?: boolean }) {
  return (
    <div className="ambient-birds" aria-hidden="true">
      <FlyingBird direction="right" size={compact ? 52 : 66} duration={12} delay={-3} top="28%" path="high" />
      <FlyingBird direction="left" size={compact ? 46 : 58} duration={16} delay={-9} top="56%" path="low" opacity={.64} />
      {!compact && <FlyingBird direction="right" size={46} duration={10} delay={-6} top="72%" path="hover" opacity={.56} />}
    </div>
  );
}

export function BirdFlock({ className = '' }: { className?: string }) {
  return <img className={`bird-flock ${className}`} src={`${THEME_ASSET}/06-bird-flock.webp`} alt="" aria-hidden="true" loading="lazy" />;
}

export function InvitationPaper({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`invitation-paper ${className}`}>
      <img src={`${THEME_ASSET}/02-invitation-paper.webp`} alt="" aria-hidden="true" loading="lazy" />
      <div className="invitation-paper__content">{children}</div>
    </div>
  );
}
