import type { Holiday } from '../../types/Holiday';
import type { Task } from '../../types/Task';
import { TaskItem } from '../tasks/TaskItem';
import {
  Cell,
  DayHeader,
  DayNumber,
  HolidayLabel,
  TasksContainer,
  AddButton,
} from './DayCell.styles';

interface DayCellProps {
  isoDate: string;
  dayOfMonth: number;
  isToday: boolean;
  isCurrentMonth: boolean;
  holidays: Holiday[];
  tasks: Task[];
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

export function DayCell({
  isoDate,
  dayOfMonth,
  isToday,
  isCurrentMonth,
  holidays,
  tasks,
  onAddTask,
  onUpdateTaskText,
  onDeleteTask,
  onReorderTask,
  onMoveTask,
}: DayCellProps) {
  const uniqueHolidays = Array.from(
    new Map(
      holidays.map(h => [`${h.date}-${h.localName}`, h]),
    ).values(),
  );

  const handleDrop: React.DragEventHandler<HTMLDivElement> = event => {
    event.preventDefault();
    const raw = event.dataTransfer.getData('text/plain');
    const [taskId, sourceDate, sourceIndexStr] = raw.split(':');
    if (!taskId || !sourceDate || sourceIndexStr == null) return;
    const sourceIndex = Number(sourceIndexStr);

    const rect = event.currentTarget.getBoundingClientRect();
    const offsetY = event.clientY - rect.top;
    const cellHeight = rect.height;
    const relative = offsetY / cellHeight;
    const approximateIndex = Math.floor(relative * (tasks.length + 1));
    const targetIndex = Math.max(0, Math.min(tasks.length, approximateIndex));

    if (sourceDate === isoDate) {
      onReorderTask(isoDate, sourceIndex, targetIndex);
    } else {
      onMoveTask(taskId, sourceDate, isoDate, targetIndex);
    }
  };

  const handleDragOver: React.DragEventHandler<HTMLDivElement> = event => {
    event.preventDefault();
  };

  return (
    <Cell
      $isToday={isToday}
      $isCurrentMonth={isCurrentMonth}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <DayHeader>
        <DayNumber>{dayOfMonth}</DayNumber>
      </DayHeader>

      {uniqueHolidays.map(holiday => (
        <HolidayLabel key={`${holiday.date}-${holiday.localName}`}>
          {holiday.localName}
        </HolidayLabel>
      ))}

      <TasksContainer>
        {tasks.map((task, index) => (
          <TaskItem
            key={task.id}
            task={task}
            index={index}
            date={isoDate}
            onUpdateText={onUpdateTaskText}
            onDelete={onDeleteTask}
            onDragStart={() => {
              // actual DnD payload is set in TaskItem
            }}
            onDragEnd={() => {
              // noop
            }}
          />
        ))}
      </TasksContainer>

      <AddButton onClick={() => onAddTask(isoDate)}>+ Add</AddButton>
    </Cell>
  );
}

