import { InvitationPaper } from './ThemeArt';

export function InvitationLine() {
  return (
    <section className="invitation-message" aria-labelledby="invitation-message-title">
      <InvitationPaper>
          <p className="invitation-message__eyebrow">بسم الله الرحمن الرحيم</p>
          <h2 id="invitation-message-title">دعوة من القلب</h2>
          <p className="invitation-message__copy"><span>بكل المحبة نتشرف بدعوتكم</span><span>لمشاركتنا فرحتنا</span></p>
          <p className="invitation-message__couple">يوسف <span>و</span> غزل</p>
          <p className="invitation-message__date" dir="ltr">19 · 9 · 2026</p>
      </InvitationPaper>
    </section>
  );
}
