export interface Task {
  id: string;
  date: string; // YYYY-MM-DD
  text: string;
  order: number;
  color?: string;
  completed?: boolean;
}

