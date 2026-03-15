import { useState, useMemo, useCallback } from 'react';
import { buildCalendarGrid, monthNames, getTodayIsoDate } from '../utils/date';

export function useCalendar() {
  const today = getTodayIsoDate();
  const now = new Date();

  const [currentYear, setCurrentYear] = useState(now.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(now.getMonth());

  const grid = useMemo(
    () => buildCalendarGrid(currentYear, currentMonth, 1),
    [currentYear, currentMonth],
  );

  const goToToday = useCallback(() => {
    const date = new Date();
    setCurrentYear(date.getFullYear());
    setCurrentMonth(date.getMonth());
  }, [setCurrentYear, setCurrentMonth]);

  const nextMonth = useCallback(() => {
    setCurrentMonth((prev) => {
      if (prev === 11) {
        setCurrentYear((y) => y + 1);
        return 0;
      }
      return prev + 1;
    });
  }, [setCurrentYear, setCurrentMonth]);

  const prevMonth = useCallback(() => {
    setCurrentMonth((prev) => {
      if (prev === 0) {
        setCurrentYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
  }, [setCurrentYear, setCurrentMonth]);

  const monthLabel = `${monthNames[currentMonth]} ${currentYear}`;

  return {
    currentYear,
    currentMonth,
    monthLabel,
    grid,
    todayIso: today,
    goToToday,
    nextMonth,
    prevMonth,
  };
}
