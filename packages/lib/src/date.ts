import { format, parse, set } from 'date-fns';

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

export function getCurrentRoundedDate() {
  return roundTo15(new Date());
}

export const GRID_CELL_TIME = 15;

export function roundTo15(date: Date) {
  const milliseconds = 1000 * 60 * GRID_CELL_TIME;
  return new Date(Math.round(date.getTime() / milliseconds) * milliseconds);
}

export function buildDate(date: Date, time: string): Date {
  const [hours, minutes] = time.split(':').map(Number);

  return set(date, { hours, minutes });
}
