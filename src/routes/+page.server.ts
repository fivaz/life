import { redirect } from '@sveltejs/kit';
import { homeRoute, loginRoute } from '$lib/consts';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const session = await locals.auth.validate();

	throw redirect(303, session ? homeRoute : loginRoute);
}) satisfies PageServerLoad;
