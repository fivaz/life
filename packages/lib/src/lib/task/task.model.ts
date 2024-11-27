import type { Category } from '../category';
import type { Goal } from '../goal';

export const frequencies = ['daily', 'weekly', 'monthly', 'yearly'] as const;

export type Frequency = (typeof frequencies)[number];

export const tailwindColors = ['red', 'green', 'blue', 'lime', 'yellow', 'purple'] as const;

export type TailwindColor = (typeof tailwindColors)[number];

export type Task = {
  id: string;
  createdAt: string;
  name: string;
  isDone: boolean;
  description: string;
  image: string;
  category: Category;
  goal: Goal | null;
  date: string;
  duration: string;
  startTime: string;
  recurringFrequency: Frequency | '';
  recurringDaysOfWeek: string[];
  recurringEndAt: string;
  recurringExceptions: string[];
};

export type SubTask = { isDone: boolean; title: string };
