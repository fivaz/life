import { z } from 'zod';

import type { HHmm, yyyyMMdd } from '$lib/date.utils.svelte';

export const zDate = z.custom<yyyyMMdd>((val) => {
	return typeof val === 'string' ? /^\d{4}-\d{2}-\d{2}$/.test(val) : false;
});

export const zTime = z.custom<HHmm>((val) => {
	return typeof val === 'string' ? /^\d{2}:\d{2}$/.test(val) : false;
});
