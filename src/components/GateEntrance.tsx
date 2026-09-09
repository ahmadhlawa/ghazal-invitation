import { memo } from 'react';
import { INVITATION } from '../invitation.config';
import { AmbientBirdLayer, BotanicalGarland, THEME_ASSET } from './ThemeArt';

interface Props { open: boolean; done: boolean; onOpen: () => void }

export const GateEntrance = memo(function GateEntrance({ open, done, onOpen }: Props) {
  return (
    <div className="letter-gate" data-open={open || undefined} data-done={done || undefined}
      role="dialog" aria-modal="true" aria-label="دعوة زفاف يوسف وغزل" aria-hidden={done || undefined}>
      <BotanicalGarland className="letter-gate__garland" />
      <AmbientBirdLayer compact />
      <div className="letter-gate__scene">
        <div className="letter-gate__paper" aria-hidden="true">
          <span>يوسف <b>+</b> غزل</span>
        </div>
        <div className="letter-gate__envelope">
          <img src={`${THEME_ASSET}/01-envelope-closed.webp`} alt="" aria-hidden="true" width="1120" height="840" />
          <span className="letter-gate__flap" aria-hidden="true" />
          <button type="button" onClick={onOpen} className="letter-gate__seal" aria-label={INVITATION.gate.lockLabel}>
            <span>افتح الدعوة</span>
          </button>
        </div>
      </div>
      <p className="letter-gate__caption">رسالة فرحٍ لك</p>
    </div>
  );
});
