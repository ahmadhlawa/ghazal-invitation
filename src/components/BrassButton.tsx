import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  onClick?: () => void;
  ariaLabel: string;
  variant?: 'solid' | 'outline';
  icon?: ReactNode;
}

/**
 * زرّ نحاسي مطروق — جزء من قرطاسية الدعوة لا عنصر واجهة عام.
 *
 * الطبقات: تدرّج نحاسي رأسي · حزّ داكن · حافة ضوء علوية · لمعة مائلة
 * تمرّ دوريًا · حالة ضغط واضحة. الحركة كلّها CSS (لا framer-motion)
 * حتى لا يُعاد تصيير الزرّ عند كل لمسة.
 */
export function BrassButton({ children, onClick, ariaLabel, variant = 'solid', icon }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={`brass-btn${variant === 'outline' ? ' brass-btn--outline' : ''}`}
    >
      <span aria-hidden="true" className="brass-btn__sheen" />
      {icon && (
        <span aria-hidden="true" className="brass-btn__icon">
          {icon}
        </span>
      )}
      <span>{children}</span>
    </button>
  );
}
