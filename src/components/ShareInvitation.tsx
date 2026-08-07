import { INVITATION } from '../invitation.config';
import { Reveal } from './Reveal';
import { BrassButton } from './BrassButton';

interface Props {
  onCopied: (ok: boolean) => void;
}

const shareLink = () => (typeof location !== 'undefined' ? location.href : '');

/** مشاركة الدعوة: مشاركة النظام، واتساب، ونسخ الرابط */
export function ShareInvitation({ onCopied }: Props) {
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareLink());
      onCopied(true);
    } catch {
      onCopied(false);
    }
  };

  const share = async () => {
    const data = {
      title: INVITATION.pageTitle,
      text: INVITATION.share.message,
      url: shareLink(),
    };
    if (navigator.share) {
      try {
        await navigator.share(data);
        return;
      } catch {
        // أُلغيت المشاركة أو تعذّرت — ننسخ الرابط بدلًا منها
      }
    }
    await copyLink();
  };

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
    `${INVITATION.share.message}\n${shareLink()}`
  )}`;

  return (
    <section aria-label="مشاركة الدعوة" className="section section--tight">
      <Reveal kind="rise">
        <BrassButton
          variant="outline"
          ariaLabel={INVITATION.share.buttonLabel}
          onClick={share}
          icon={<ShareGlyph />}
        >
          {INVITATION.share.buttonLabel}
        </BrassButton>
      </Reveal>

      <Reveal kind="rise" delay={0.14}>
        <div className="share__links">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={INVITATION.share.whatsappLabel}
          >
            {INVITATION.share.whatsappLabel}
          </a>
          <span aria-hidden="true" className="share__sep" />
          <button type="button" onClick={copyLink} aria-label="نسخ رابط الدعوة">
            {INVITATION.share.copyLabel}
          </button>
        </div>
      </Reveal>
    </section>
  );
}

function ShareGlyph() {
  return (
    <svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="15" cy="4.5" r="2.6" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="5" cy="10" r="2.6" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="15" cy="15.5" r="2.6" stroke="currentColor" strokeWidth="1.4" />
      <path d="M12.6 5.8L7.4 8.7M7.4 11.3l5.2 2.9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
