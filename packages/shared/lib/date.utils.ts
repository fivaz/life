import { format, parse } from 'date-fns';

export const DATE = 'yyyy-MM-dd';
export const TIME = 'HH:mm';

export type yyyyMMdd = `${number}-${number}-${number}`;
export type HHmm = `${number}:${number}`;

export function formatDate(date: Date): yyyyMMdd {
  return format(date, DATE) as yyyyMMdd;
}

export function parseDate(date: yyyyMMdd): Date {
  return parse(date, DATE, new Date());
}

export function formatTime(date: Date): HHmm {
  return format(date, TIME) as HHmm;
}
