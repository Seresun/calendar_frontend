import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Task } from '../types/Task';
import {
  fetchTasksByMonth,
  createTask,
  updateTask,
  deleteTask,
  type UpdateTaskBody,
} from '../api/tasksApi';
import { reorderWithinDay, moveTaskBetweenDays } from '../utils/reorder';

export function useTasks(year: number, month: number, searchQuery: string) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTasks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchTasksByMonth({ year, month });
      setTasks(data);
    } catch {
      setError('Failed to load tasks');
    } finally {
      setIsLoading(false);
    }
  }, [year, month]);

  useEffect(() => {
    void loadTasks();
  }, [loadTasks]);

  const filteredTasks = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return tasks;
    return tasks.filter(t => t.text.toLowerCase().includes(q));
  }, [tasks, searchQuery]);

  const tasksByDate = useMemo(() => {
    const map = new Map<string, Task[]>();
    for (const task of filteredTasks) {
      const list = map.get(task.date) ?? [];
      list.push(task);
      map.set(task.date, list);
    }
    for (const [key, list] of map.entries()) {
      map.set(
        key,
        [...list].sort((a, b) => {
          if (a.order === b.order) return a.text.localeCompare(b.text);
          return a.order - b.order;
        }),
      );
    }
    return map;
  }, [filteredTasks]);

  const addTask = useCallback(
    async (date: string, text: string) => {
      const optimistic: Task = {
        id: `tmp-${Date.now()}`,
        date,
        text,
        order:
          (tasksByDate.get(date)?.reduce((max, t) => Math.max(max, t.order), -1) ?? -1) + 1,
      };

      setTasks(prev => [...prev, optimistic]);

      try {
        const created = await createTask({ date, text });
        setTasks(prev =>
          prev.map(t => (t.id === optimistic.id ? created : t)),
        );
      } catch {
        setTasks(prev => prev.filter(t => t.id !== optimistic.id));
        setError('Failed to create task');
      }
    },
    [tasksByDate],
  );

  const patchTask = useCallback(async (id: string, patch: UpdateTaskBody) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, ...patch } : t)),
    );
    try {
      await updateTask(id, patch);
    } catch {
      void loadTasks();
      setError('Failed to update task');
    }
  }, [loadTasks]);

  const removeTask = useCallback(async (id: string) => {
    const prev = tasks;
    setTasks(current => current.filter(t => t.id !== id));
    try {
      await deleteTask(id);
    } catch {
      setTasks(prev);
      setError('Failed to delete task');
    }
  }, [tasks]);

  const reorderDayTasks = useCallback(
    (date: string, sourceIndex: number, destIndex: number) => {
      setTasks(prev => {
        const dayTasks = prev.filter(t => t.date === date);
        const other = prev.filter(t => t.date !== date);
        const reordered = reorderWithinDay(dayTasks, sourceIndex, destIndex);
        return [...other, ...reordered];
      });

      const dayTasks = tasksByDate.get(date) ?? [];
      const reordered = reorderWithinDay(dayTasks, sourceIndex, destIndex);
      for (const task of reordered) {
        void updateTask(task.id, { order: task.order });
      }
    },
    [tasksByDate],
  );

  const moveTask = useCallback(
    (taskId: string, sourceDate: string, targetDate: string, targetIndex: number) => {
      setTasks(prev =>
        moveTaskBetweenDays(prev, taskId, sourceDate, targetDate, targetIndex),
      );

      const all = moveTaskBetweenDays(tasks, taskId, sourceDate, targetDate, targetIndex);
      const affected = all.filter(
        t => t.date === sourceDate || t.date === targetDate,
      );
      for (const task of affected) {
        void updateTask(task.id, { date: task.date, order: task.order });
      }
    },
    [tasks],
  );

  return {
    tasksByDate,
    isLoading,
    error,
    loadTasks,
    addTask,
    patchTask,
    removeTask,
    reorderDayTasks,
    moveTask,
  };
}

