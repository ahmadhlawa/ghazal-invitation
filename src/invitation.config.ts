/**
 * ملف الإعدادات المركزي للدعوة.
 * لإنشاء دعوة جديدة عدّل هذه القيم فقط — لا تكرّر الأسماء أو التواريخ داخل المكوّنات.
 *
 * ملاحظة: عنوان الصفحة ووسوم Open Graph داخل index.html نصّ ثابت لأنّه يُقرأ
 * قبل تحميل جافاسكربت — إن غيّرت الأسماء هنا فحدّثها هناك أيضًا.
 */

export type EventIcon = 'henna' | 'men' | 'women' | 'rings';

export interface InvitationEvent {
  id: string;
  icon: EventIcon;
  /** اسم اليوم — يُعرض في لوحة التاريخ */
  weekday: string;
  /** التاريخ الرقمي — يُعرض تحت اسم اليوم */
  date: string;
  /** اسم المناسبة */
  title: string;
  /** المكان الرئيسي */
  place: string;
  /** أسطر إضافية للعنوان أو التفاصيل — قد تكون فارغة */
  details: string[];
  /** المناسبة الكبرى: بطاقة أوسع وإطار ذهبي أقوى */
  primary?: boolean;
}

/* ── الأسماء: مصدر واحد تُشتقّ منه كل النصوص ── */
const GROOM = 'yousef';
const BRIDE = 'ghazal';
const COUPLE_DISPLAY_AR = 'يوسف وغزل';
/** الصيغة العربية المستعملة في العناوين والرسائل */
const COUPLE_AR = COUPLE_DISPLAY_AR;

/* ── موعد الزفاف ──
   السبت ٢٩ أغسطس ٢٠٢٦، الساعة ٦:٠٠ مساءً بتوقيت فلسطين. */
const WEDDING_DATE = '2026-09-19';
const WEDDING_TIME = '17:00';
/** الصيغة العربية المعروضة للساعة */
const WEDDING_TIME_AR = 'الساعة 5:00 مساءً';
/** مدّة الحفل بالساعات — تُستعمل لحساب نهاية الموعد */
const WEDDING_DURATION_H = 5;
/** إزاحة توقيت فلسطين — تجعل لحظة البدء مطلقة لا نسبية بمنطقة الزائر */
const UTC_OFFSET = '+03:00';

const addHours = (time: string, hours: number) => {
  const [h, m] = time.split(':').map(Number);
  return `${String((h + hours) % 24).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
};

export const INVITATION = {
  pageTitle: `دعوة زفاف ${COUPLE_AR}`,
  pageDescription: `نتشرف بدعوتكم لمشاركتنا أفراح ${COUPLE_AR}`,

  /** بوّابة الدخول — المشهد الأول */
  gate: {
    kicker: 'دعوة زفاف يوسف وغزل',
    hint: 'اضغط لفتح الدعوة',
    lockLabel: 'افتح الدعوة',
  },

  groomName: GROOM,
  brideName: BRIDE,
  conjunction: '&',

  /** الدعاء الذي يعلو المشهد فوق التلّة */
  blessing: 'بارك الله لهما وبارك عليهما وجمع بينهما في الخير',

  /** جملة الانتقال بين المشهد الأول وبرنامج الأفراح */
  invitationLine: 'بكل المحبة نتشرف بدعوتكم لمشاركتنا فرحتنا',

  eventsHeading: 'مواعيد الفرح',

  events: [
    {
      id: 'women-evening',
      icon: 'women',
      weekday: 'الأربعاء',
      date: '16 / 09 / 2026',
      title: 'سهرة النساء',
      place: 'قاعة شاهين',
      details: ['يُمنع التصوير داخل قاعة النساء'],
    },
    {
      id: 'wedding',
      icon: 'rings',
      weekday: 'السبت',
      date: '19 / 09 / 2026',
      title: 'حفل زفاف يوسف وغزل',
      place: 'قاعة القصر الذهبي 1 – دورا',
      details: [WEDDING_TIME_AR],
      primary: true,
    },
  ] satisfies InvitationEvent[] as InvitationEvent[],

  calendar: {
    /** سبتمبر 2026 */
    year: 2026,
    month: 9,
    monthName: 'سبتمبر',
    monthLabel: 'سبتمبر 2026',
    softHighlight: [16],
    mainDay: 19,
    /** الأسبوع يبدأ بالسبت */
    weekdayNames: ['س', 'ح', 'ن', 'ث', 'ر', 'خ', 'ج'],
    buttonLabel: 'إضافة حفل الزفاف إلى التقويم',
  },

  wedding: {
    date: WEDDING_DATE,
    /** ساعة البدء */
    start: WEDDING_TIME,
    end: addHours(WEDDING_TIME, WEDDING_DURATION_H),
    /**
     * لحظة بدء الزفاف بإزاحة زمنية صريحة — مرجع العدّ التنازلي.
     * الإزاحة تجعل الهدف لحظةً مطلقة لا نسبية بمنطقة الزائر.
     */
    dateTime: `${WEDDING_DATE}T${WEDDING_TIME}:00${UTC_OFFSET}`,
    timeZone: 'Asia/Hebron',
  },

  countdown: {
    heading: 'باقي على فرحتنا',
    /** الترتيب: الأيام ← الساعات ← الدقائق ← الثواني */
    labels: {
      days: 'يوم',
      hours: 'ساعة',
      minutes: 'دقيقة',
      seconds: 'ثانية',
    },
    doneMessage: 'تمت الفرحة بحمد الله',
  },

  venue: {
    heading: 'موقع القاعة',
    name: 'قاعة القصر الذهبي 1 – دورا',
    latitude: '',
    longitude: '',
    mapsUrl: 'https://maps.app.goo.gl/nPu7Zps53mQwEEFa8',
    buttonLabel: 'فتح موقع القاعة',
  },

  closing: {
    primary: 'بارك الله لهما وبارك عليهما',
    secondary: 'حضوركم يسعدنا ويكمل فرحتنا',
  },

  audio: {
    src: '/audio/wedding-music.mpeg',
    playLabel: 'تشغيل الصوت',
    pauseLabel: 'إيقاف الصوت',
    targetVolume: 0.75,
  },

  share: {
    buttonLabel: 'مشاركة الدعوة',
    whatsappLabel: 'المشاركة عبر واتساب',
    copyLabel: 'نسخ الرابط',
    message: `نتشرف بدعوتكم لمشاركتنا أفراح ${COUPLE_AR}`,
  },

  /** عنوان الحدث داخل ملف ICS */
  icsTitle: `حفل زفاف ${COUPLE_AR}`,

  toasts: {
    calendarOk: 'تم إنشاء ملف الموعد',
    calendarFail: 'تعذّر إنشاء ملف الموعد',
    copyOk: 'تم نسخ رابط الدعوة',
    copyFail: 'انسخ الرابط من شريط المتصفح',
    audioFail: 'تعذّر تشغيل الصوت',
  },
} as const;

/** الصيغة المزخرفة: «عدي & W» */
export const coupleTitle = `${INVITATION.groomName} ${INVITATION.conjunction} ${INVITATION.brideName}`;
