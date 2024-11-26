export const frequencies = ['daily', 'weekly', 'monthly', 'yearly'] as const;

export type Frequency = (typeof frequencies)[number];

export const CATEGORY_WORK = 'work';

export const categoryTypes = ['fun', 'sleep', CATEGORY_WORK] as const;

export type CategoryType = (typeof categoryTypes)[number];

export const tailwindColors = ['red', 'green', 'blue', 'lime', 'yellow', 'purple'] as const;

export type TailwindColor = (typeof tailwindColors)[number];

// these will be used by Calendar
export type Category = {
  id: string;
  name: string;
  isDefault: boolean;
  type: CategoryType;
  color: TailwindColor;
};

export type Goal = {
  id: string;
  name: string;
  icon: string;
  deadline: string;
  isDone: boolean;
};

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
