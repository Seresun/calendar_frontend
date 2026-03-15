import type { Task } from '../types/Task';

export function reorderWithinDay(tasks: Task[], sourceIndex: number, destIndex: number): Task[] {
  const items = [...tasks].sort((a, b) => a.order - b.order);
  const [moved] = items.splice(sourceIndex, 1);
  items.splice(destIndex, 0, moved);
  return items.map((task, index) => ({ ...task, order: index }));
}

export function moveTaskBetweenDays(
  allTasks: Task[],
  taskId: string,
  sourceDate: string,
  targetDate: string,
  targetIndex: number,
): Task[] {
  const tasks = [...allTasks];
  const moving = tasks.find(t => t.id === taskId);
  if (!moving) return tasks;

  const remaining = tasks.filter(t => t.id !== taskId);

  const sourceDay = remaining
    .filter(t => t.date === sourceDate)
    .sort((a, b) => a.order - b.order)
    .map((t, index) => ({ ...t, order: index }));

  const targetDay = remaining
    .filter(t => t.date === targetDate)
    .sort((a, b) => a.order - b.order);

  const other = remaining.filter(t => t.date !== sourceDate && t.date !== targetDate);

  const updatedMoving: Task = {
    ...moving,
    date: targetDate,
  };

  const newTargetDay = [...targetDay];
  newTargetDay.splice(targetIndex, 0, updatedMoving);
  const normalizedTarget = newTargetDay.map((t, index) => ({ ...t, order: index }));

  return [...other, ...sourceDay, ...normalizedTarget];
}

