import { apiClient } from './client';
import type { Task } from '../types/Task';

export interface FetchTasksParams {
  year: number;
  month: number; // 0-11
}

function toYearMonthStrings(year: number, monthZeroBased: number) {
  const month = monthZeroBased + 1;
  const yearStr = String(year);
  const monthStr = month < 10 ? `0${month}` : String(month);
  return { yearStr, monthStr };
}

export async function fetchTasksByMonth({
  year,
  month,
}: FetchTasksParams): Promise<Task[]> {
  const { yearStr, monthStr } = toYearMonthStrings(year, month);
  const response = await apiClient.get<Task[]>('/tasks', {
    params: { year: yearStr, month: monthStr },
  });
  return response.data;
}

export interface CreateTaskBody {
  date: string;
  text: string;
  color?: string;
  completed?: boolean;
}

export async function createTask(body: CreateTaskBody): Promise<Task> {
  const response = await apiClient.post<Task>('/tasks', body);
  return response.data;
}

export type UpdateTaskBody = Partial<
  Pick<Task, 'text' | 'date' | 'order' | 'color' | 'completed'>
>;

export async function updateTask(
  id: string,
  body: UpdateTaskBody,
): Promise<Task> {
  const response = await apiClient.put<Task>(`/tasks/${id}`, body);
  return response.data;
}

export async function deleteTask(id: string): Promise<void> {
  await apiClient.delete(`/tasks/${id}`);
}

