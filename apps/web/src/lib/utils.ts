import { z } from 'zod';

export const zDate = z.custom<string>((val) => {
	return typeof val === 'string' ? /^\d{4}-\d{2}-\d{2}$/.test(val) : false;
});

export const zDateOrEmpty = z.union([zDate, z.literal('')]);

export const zTime = z.custom<string>((val) => {
	return typeof val === 'string' ? /^\d{2}:\d{2}$/.test(val) : false;
});

export const zTimeOrEmpty = z.union([zTime, z.literal('')]);

export function groupBy<T>(array: T[], keyFn: (item: T) => string): Record<string, T[]> {
	return array.reduce<Record<string, T[]>>((result, item) => {
		const key = keyFn(item);
		if (!result[key]) {
			result[key] = [];
		}
		result[key].push(item);
		return result;
	}, {});
}
