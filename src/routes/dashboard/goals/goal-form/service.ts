import { DATE } from '$lib/consts';
import { parse } from 'date-fns';

export function buildDeadline(formData: FormData) {
	// This need to be done in the client to avoid persisting a date from a different
	// timezone if the server is in a different timezone
	const date = formData.get('deadline') as string;

	const dateISO = parse(date, DATE, new Date());

	formData.set('deadline', dateISO.toISOString());
}
