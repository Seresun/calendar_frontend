import { apiClient } from './client';
import type { Holiday } from '../types/Holiday';

export interface FetchHolidaysParams {
  year: number;
  country: string;
}

export async function fetchHolidays({
  year,
  country,
}: FetchHolidaysParams): Promise<Holiday[]> {
  const response = await apiClient.get<Holiday[]>('/holidays', {
    params: { year: String(year), country },
  });
  return response.data;
}

