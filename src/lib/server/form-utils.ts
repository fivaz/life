import { fail } from '@sveltejs/kit';

export async function handleError(error: unknown) {
	console.log('error', error);
	return fail(422, {
		error: error instanceof Error ? error.message : 'unknown error',
	});
}
