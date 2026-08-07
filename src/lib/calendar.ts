import { INVITATION } from '../invitation.config';

export interface DayCell {
  day: number | null;
  kind: 'blank' | 'normal' | 'soft' | 'main';
}

/**
 * يبني خلايا الشهر بأسبوع يبدأ بالسبت (كما في التقويم العربي المرجعي).
 */
export function buildMonthCells(): DayCell[] {
  const { year, month, softHighlight, mainDay } = INVITATION.calendar;
  const firstDow = new Date(year, month - 1, 1).getDay(); // 0 = الأحد
  const offset = (firstDow + 1) % 7; // إزاحة بحيث يكون السبت أول عمود
  const daysInMonth = new Date(year, month, 0).getDate();

  const cells: DayCell[] = [];
  for (let i = 0; i < offset; i++) cells.push({ day: null, kind: 'blank' });

  for (let d = 1; d <= daysInMonth; d++) {
    const kind: DayCell['kind'] =
      d === mainDay ? 'main' : (softHighlight as readonly number[]).includes(d) ? 'soft' : 'normal';
    cells.push({ day: d, kind });
  }

  while (cells.length % 7 !== 0) cells.push({ day: null, kind: 'blank' });
  return cells;
}

const escapeIcs = (value: string) =>
  value.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');

const day = (date: string) => date.replace(/-/g, '');
const stamp = (date: string, time: string) => `${day(date)}T${time.replace(':', '')}00`;

/**
 * سطرا البداية والنهاية بساعة عائمة (بلا منطقة زمنية): الموعد يُعرض
 * ٦:٠٠ مساءً في تقويم الضيف كما هو مكتوب في الدعوة.
 */
function periodLines(): [string, string] {
  const { date, start, end } = INVITATION.wedding;
  return [`DTSTART:${stamp(date, start)}`, `DTEND:${stamp(date, end)}`];
}

/** ينشئ ملف ICS في المتصفح دون أي خادم، ويشغّل تنزيله. */
export function downloadWeddingIcs(): boolean {
  const { venue } = INVITATION;
  const [dtStart, dtEnd] = periodLines();

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'CALSCALE:GREGORIAN',
    'PRODID:-//Wedding Invitation//AR//',
    'BEGIN:VEVENT',
    `UID:${Date.now()}@wedding-invitation`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
    dtStart,
    dtEnd,
    `SUMMARY:${escapeIcs(INVITATION.icsTitle)}`,
    `LOCATION:${escapeIcs(venue.name)}`,
    `DESCRIPTION:${escapeIcs(`موقع القاعة: ${venue.mapsUrl}`)}`,
    `GEO:${venue.latitude};${venue.longitude}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  try {
    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'wedding.ics';
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 4000);
    return true;
  } catch {
    return false;
  }
}
