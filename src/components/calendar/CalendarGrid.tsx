import styled from '@emotion/styled';
import type { CalendarGrid as Grid } from '../../utils/date';
import type { Holiday } from '../../types/Holiday';
import type { Task } from '../../types/Task';
import { DayCell } from './DayCell';

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: 150px;
  gap: 1px;
  background: ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  overflow: hidden;
`;

const WeekdayRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: ${({ theme }) => theme.spacing(1)};
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

const WeekdayCell = styled.div`
  text-align: left;
  padding: 0 ${({ theme }) => theme.spacing(1)};
`;

const weekdayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

interface CalendarGridProps {
  grid: Grid;
  todayIso: string;
  holidays: Holiday[];
  tasksByDate: Map<string, Task[]>;
  onAddTask: (date: string) => void;
  onUpdateTaskText: (id: string, text: string) => void;
  onDeleteTask: (id: string) => void;
  onReorderTask: (date: string, fromIndex: number, toIndex: number) => void;
  onMoveTask: (
    taskId: string,
    sourceDate: string,
    targetDate: string,
    targetIndex: number,
  ) => void;
}

export function CalendarGrid({
  grid,
  todayIso,
  holidays,
  tasksByDate,
  onAddTask,
  onUpdateTaskText,
  onDeleteTask,
  onReorderTask,
  onMoveTask,
}: CalendarGridProps) {
  return (
    <>
      <WeekdayRow>
        {weekdayLabels.map(label => (
          <WeekdayCell key={label}>{label}</WeekdayCell>
        ))}
      </WeekdayRow>
      <GridWrapper>
        {grid.weeks.flat().map(day => (
          <DayCell
            key={day.isoDate + day.dayOfMonth}
            isoDate={day.isoDate}
            dayOfMonth={day.dayOfMonth}
            isToday={day.isoDate === todayIso}
            isCurrentMonth={day.isCurrentMonth}
            holidays={holidays.filter(h => h.date === day.isoDate)}
            tasks={tasksByDate.get(day.isoDate) ?? []}
            onAddTask={onAddTask}
            onUpdateTaskText={onUpdateTaskText}
            onDeleteTask={onDeleteTask}
            onReorderTask={onReorderTask}
            onMoveTask={onMoveTask}
          />
        ))}
      </GridWrapper>
    </>
  );
}

