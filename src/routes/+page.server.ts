import { redirect } from '@sveltejs/kit';
import { homeRoute, loginRoute } from '$lib/consts';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
	const session = await event.locals.getSession();

	throw redirect(303, session?.user ? homeRoute : loginRoute);
}) satisfies PageServerLoad;
