export interface CalendarDay {
  isoDate: string; // YYYY-MM-DD
  dayOfMonth: number;
  isCurrentMonth: boolean;
}

export interface CalendarGrid {
  weeks: CalendarDay[][];
}

function pad2(n: number): string {
  return n < 10 ? `0${n}` : String(n);
}

export function toIsoDate(year: number, monthZeroBased: number, day: number) {
  return `${year}-${pad2(monthZeroBased + 1)}-${pad2(day)}`;
}

export function getTodayIsoDate(): string {
  const now = new Date();
  return toIsoDate(now.getFullYear(), now.getMonth(), now.getDate());
}

export function buildCalendarGrid(
  year: number,
  monthZeroBased: number,
  firstDayOfWeek: 0 | 1 = 1,
): CalendarGrid {
  const firstOfMonth = new Date(Date.UTC(year, monthZeroBased, 1));
  const dayOfWeek = firstOfMonth.getUTCDay(); // 0=Sun..6=Sat

  const offset =
    firstDayOfWeek === 1
      ? (dayOfWeek === 0 ? 6 : dayOfWeek - 1)
      : dayOfWeek;

  const daysInMonth = new Date(Date.UTC(year, monthZeroBased + 1, 0)).getUTCDate();

  const weeks: CalendarDay[][] = [];
  const totalCells = 6 * 7;

  for (let cell = 0; cell < totalCells; cell += 1) {
    const dayIndex = cell - offset;
    const date = new Date(Date.UTC(year, monthZeroBased, 1));
    date.setUTCDate(dayIndex + 1);

    const cellYear = date.getUTCFullYear();
    const cellMonth = date.getUTCMonth();
    const cellDay = date.getUTCDate();

    const isCurrentMonth =
      cellYear === year && cellMonth === monthZeroBased && cellDay >= 1 && cellDay <= daysInMonth;

    const isoDate = toIsoDate(cellYear, cellMonth, cellDay);

    const calendarDay: CalendarDay = {
      isoDate,
      dayOfMonth: cellDay,
      isCurrentMonth,
    };

    const weekIndex = Math.floor(cell / 7);
    if (!weeks[weekIndex]) {
      weeks[weekIndex] = [];
    }
    weeks[weekIndex].push(calendarDay);
  }

  return { weeks };
}

export const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

