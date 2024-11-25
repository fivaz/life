import { format, parse } from 'date-fns';

export const DATE = 'yyyy-MM-dd';
export const TIME = 'HH:mm';

export function formatDate(date: Date): string {
  return format(date, DATE);
}

export function parseDate(date: string): Date {
  return parse(date, DATE, new Date());
}

export function formatTime(date: Date): string {
  return format(date, TIME);
}
