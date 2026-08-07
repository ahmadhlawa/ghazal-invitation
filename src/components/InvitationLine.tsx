import { INVITATION } from '../invitation.config';
import { Flourish } from '../ornaments/Ornament';
import { Reveal } from './Reveal';

/**
 * جملة الوصل بين المشهد وبرنامج الأفراح.
 *
 * ليست عنوان قسم: لا لوحة ولا بطاقة — سطر منقوش وحده على العاج يتبعه
 * فاصل يُرسم من المركز، فيقرأ خطابًا من أهل الدعوة لا ترويسة موقع.
 */
export function InvitationLine() {
  return (
    <div className="invite-line">
      <Reveal kind="carve" duration={0.95}>
        <p className="invite-line__text brass-text balance">{INVITATION.invitationLine}</p>
      </Reveal>

      <Reveal
        kind="draw"
        delay={0.24}
        duration={0.9}
        style={{ display: 'flex', justifyContent: 'center', marginTop: '10px', opacity: 0.8 }}
      >
        <Flourish width={150} />
      </Reveal>
    </div>
  );
}
