import { motion, useReducedMotion } from 'framer-motion';
import { INVITATION } from '../invitation.config';
import { buildMonthCells, downloadWeddingIcs } from '../lib/calendar';
import { Flourish } from '../ornaments/Ornament';
import { Reveal, VIEWPORT } from './Reveal';
import { WoodCard } from './WoodCard';
import { BrassButton } from './BrassButton';

interface Props {
  onResult: (ok: boolean) => void;
}

/** تقويم الشهر — مبنيّ ديناميكيًا من الإعدادات، RTL، والسبت أول الأسبوع */
export function ArabicCalendar({ onResult }: Props) {
  const reduced = useReducedMotion();
  const cells = buildMonthCells();
  const { weekdayNames, monthName, monthLabel, mainDay, buttonLabel } = INVITATION.calendar;

  return (
    <section aria-labelledby="calendar-heading" className="section section--tight">
      <Reveal kind="depth" duration={0.88}>
        <WoodCard>
          <Reveal kind="carve" duration={0.8}>
            <h2 id="calendar-heading" className="cal__month" style={{ color: 'var(--ink-strong)' }}>
              {monthLabel}
            </h2>
          </Reveal>

          <Reveal
            kind="draw"
            delay={0.18}
            duration={0.85}
            style={{ display: 'flex', justifyContent: 'center', margin: '2px 0 14px', opacity: 0.8 }}
          >
            <Flourish width={170} />
          </Reveal>

          {/* ── أيام الأسبوع ── */}
          <Reveal kind="rise" delay={0.24} duration={0.6}>
            <div role="row" className="cal__row">
              {weekdayNames.map((w, i) => (
                <span key={i} role="columnheader" className="cal__weekday">
                  {w}
                </span>
              ))}
            </div>
          </Reveal>

          {/* ── شبكة الأيام: تتفتّح خليّة خليّة ── */}
          <motion.div
            role="grid"
            aria-label={`تقويم ${monthLabel}`}
            className="cal__grid"
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: reduced ? 0 : 0.012, delayChildren: 0.3 } },
            }}
          >
            {cells.map((cell, i) => {
              const isMain = cell.kind === 'main';
              return (
                <motion.div
                  key={i}
                  role="gridcell"
                  className="cal__cell"
                  data-kind={cell.kind}
                  aria-label={
                    cell.day
                      ? isMain
                        ? `${cell.day} ${monthName} — حفل الزفاف`
                        : `${cell.day} ${monthName}`
                      : undefined
                  }
                  variants={{
                    hidden: reduced ? { opacity: 0 } : { opacity: 0, scale: 0.72 },
                    show: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
                  }}
                >
                  {isMain && !reduced ? (
                    <motion.span
                      animate={{ scale: [1, 1.08, 1] }}
                      transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {cell.day}
                    </motion.span>
                  ) : (
                    (cell.day ?? '')
                  )}
                </motion.div>
              );
            })}
          </motion.div>

          {/* ── زرّ إضافة الموعد ── */}
          <Reveal kind="rise" delay={0.5} style={{ marginTop: 18 }}>
            <BrassButton
              ariaLabel={`${buttonLabel} — يوم ${mainDay} ${monthLabel}`}
              onClick={() => onResult(downloadWeddingIcs())}
              icon={<CalendarGlyph />}
            >
              {buttonLabel}
            </BrassButton>
          </Reveal>
        </WoodCard>
      </Reveal>
    </section>
  );
}

function CalendarGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2.5" y="4" width="15" height="13.5" rx="2.2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M2.5 8h15M6.5 2.5V5M13.5 2.5V5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="7" cy="11.5" r="1" fill="currentColor" />
      <circle cx="10" cy="11.5" r="1" fill="currentColor" />
      <circle cx="13" cy="11.5" r="1" fill="currentColor" />
      <circle cx="7" cy="14.5" r="1" fill="currentColor" />
      <circle cx="10" cy="14.5" r="1" fill="currentColor" />
    </svg>
  );
}
