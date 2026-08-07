import { memo } from 'react';
import { INVITATION } from '../invitation.config';
import { SCENE } from '../scene/assets';
import { Particles } from '../ornaments/Particles';
import { Flourish } from '../ornaments/Ornament';

interface Props {
  /** بدأ تسلسل الفتح — يُضبط مرة واحدة فقط */
  open: boolean;
  /** انتهى التسلسل: تُخفى الطبقة نهائيًا دون إزالتها من الشجرة */
  done: boolean;
  onOpen: () => void;
}

/**
 * البوّابة — المشهدان الأوّل والثاني.
 *
 * كل التسلسل (ارتجاج القفل ← ومضة ← انفراج المصراعين ← تدفّق الضوء ←
 * دفعة الكاميرا عبر المدخل) يجري في CSS انطلاقًا من السمة data-open
 * الواحدة. لا حالة مرحلة في React: كل مرحلة لو كانت تغييرَ حالة لأعادت
 * تصيير الشجرة كاملة في منتصف حركة ثقيلة بصريًا.
 *
 * الطبقة لا تُنزع عند الانتهاء بل تُخفى (data-done)، فلا يقع نزع كامل
 * لطبقة ثلاثية الأبعاد في منتصف الحركة.
 *
 * المحاذاة: كل ما بداخل .gate__fit يُموضَع بالنسبة المئوية من مساحة
 * تحمل نسبة الصورة نفسها، فيبقى القفل التفاعلي فوق القفل المرسوم داخل
 * الصورة مهما تغيّرت أبعاد الشاشة.
 */
export const GateEntrance = memo(function GateEntrance({ open, done, onOpen }: Props) {
  return (
    <div
      className="gate"
      data-open={open || undefined}
      data-done={done || undefined}
      role="dialog"
      aria-modal="true"
      aria-label="بوّابة الدعوة"
      aria-hidden={done || undefined}
    >
      <div className="gate__camera">
        <div className="gate__fit scene-fit">
          {/* ما خلف البوّابة: الممرّ عند الغروب — يسطع مع الانفراج */}
          <div className="gate__behind" aria-hidden="true">
            <img src={SCENE.gateOpen} alt="" />
          </div>

          {/* شقّ الضوء بين المصراعين */}
          <div className="gate__seam" aria-hidden="true" />

          {/* المصراعان — كل واحد نصف الصورة، يدور حول مفصلته */}
          <div className="gate__door gate__door--l" aria-hidden="true">
            <img src={SCENE.gateClosed} alt="" />
          </div>
          <div className="gate__door gate__door--r" aria-hidden="true">
            <img src={SCENE.gateClosed} alt="" />
          </div>

          {/* وهج الفوانيس المرسومة داخل الصورة */}
          <div className="gate__lanterns" aria-hidden="true" />

          {/* ── القفل: هو نفسه نقطة التفاعل ──
              الوجه قصاصة من الصورة نفسها محاذية فوق القفل المرسوم، فلا
              يبدو زرًّا مضافًا بل جزءًا من البوّابة. */}
          <button type="button" className="gate__lock" onClick={onOpen} aria-label={INVITATION.gate.lockLabel}>
            <span className="gate__lock-glow" aria-hidden="true" />
            <span className="gate__lock-face" aria-hidden="true">
              <img src={SCENE.gateClosed} alt="" />
            </span>
            <span className="gate__lock-sheen" aria-hidden="true" />
            <span className="gate__lock-ring" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* غبار ذهبي وبتلات تسبح في ضوء الفوانيس */}
      <Particles count={7} variant="dust" peak={0.55} />
      <Particles count={5} variant="petal" peak={0.5} />

      <div className="gate__flash" aria-hidden="true" />
      <div className="gate__vignette" aria-hidden="true" />

      <div className="gate__ui">
        <p className="gate__kicker brass-text">{INVITATION.gate.kicker}</p>

        <p className="gate__hint">
          <Flourish width={130} />
          {INVITATION.gate.hint}
        </p>
      </div>
    </div>
  );
});
