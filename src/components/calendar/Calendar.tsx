import { useState, useEffect } from 'react';
import { useCalendar } from '../../hooks/useCalendar';
import { useTasks } from '../../hooks/useTasks';
import type { Holiday } from '../../types/Holiday';
import { fetchHolidays } from '../../api/holidaysApi';
import { CalendarHeader } from './CalendarHeader';
import { CalendarGrid } from './CalendarGrid';
import { SearchBar } from '../search/SearchBar';

const DEFAULT_COUNTRY = 'US';

export function Calendar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [holidaysError, setHolidaysError] = useState<string | null>(null);

  const {
    currentYear,
    currentMonth,
    monthLabel,
    grid,
    todayIso,
    goToToday,
    nextMonth,
    prevMonth,
  } = useCalendar();

  const {
    tasksByDate,
    addTask,
    patchTask,
    removeTask,
    reorderDayTasks,
    moveTask,
  } = useTasks(currentYear, currentMonth, searchQuery);

  useEffect(() => {
    const load = async () => {
      try {
        setHolidaysError(null);
        const data = await fetchHolidays({
          year: currentYear,
          country: DEFAULT_COUNTRY,
        });
        setHolidays(data);
      } catch {
        setHolidaysError('Failed to load holidays');
      }
    };
    void load();
  }, [currentYear]);

  return (
    <div>
      <CalendarHeader
        title={monthLabel}
        onPrev={prevMonth}
        onNext={nextMonth}
        onToday={goToToday}
      />
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      {holidaysError && (
        <div style={{ fontSize: 12, marginBottom: 8, color: '#f97316' }}>
          {holidaysError}
        </div>
      )}
      <CalendarGrid
        grid={grid}
        todayIso={todayIso}
        holidays={holidays}
        tasksByDate={tasksByDate}
        onAddTask={date => {
          const text = window.prompt('Task');
          if (text && text.trim()) {
            void addTask(date, text.trim());
          }
        }}
        onUpdateTaskText={(id, text) => {
          void patchTask(id, { text });
        }}
        onDeleteTask={id => {
          void removeTask(id);
        }}
        onReorderTask={(date, from, to) => {
          reorderDayTasks(date, from, to);
        }}
        onMoveTask={(taskId, sourceDate, targetDate, targetIndex) => {
          moveTask(taskId, sourceDate, targetDate, targetIndex);
        }}
      />
    </div>
  );
}

