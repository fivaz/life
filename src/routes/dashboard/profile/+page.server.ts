// routes/+page.server.ts
import { fail, redirect } from '@sveltejs/kit';
import { loginRoute, unauthorized, UnknownError } from '$lib/consts';
import prisma from '$lib/prisma';
import { auth } from '$lib/server/lucia';
import type { Actions, PageServerLoad } from './$types';

async function createAvatarString(avatarData: File): Promise<string | undefined> {
	if (avatarData.size) {
		const base64 = Buffer.from(await avatarData.arrayBuffer()).toString('base64');
		return 'data:image/png;base64,' + encodeURIComponent(base64);
	}
	return undefined;
}

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session) {
		throw redirect(302, loginRoute);
	}
	return { user: { ...session.user, id: session.user.userId } };
};

export const actions: Actions = {
	save: async ({ request, locals }) => {
		const session = await locals.auth.validate();

		if (!session) {
			throw fail(401, { error: unauthorized });
		}

		try {
			const data = await request.formData();
			const avatar = await createAvatarString(data.get('avatar') as File);
			const name = data.get('name') as string;
			const username = data.get('username') as string;
			const password = data.get('password') as string;

			if (password) {
				await auth.updateKeyPassword('username', username, password);
			}

			await prisma.user.update({
				where: { id: session.user.userId },
				data: {
					...(avatar ? { avatar } : {}),
					name,
					username,
				},
			});

			return { success: true };
		} catch (error) {
			console.log('error', error);
			return fail(422, {
				error: error instanceof Error ? error.message : UnknownError,
			});
		}
	},

	logout: async ({ locals }) => {
		const session = await locals.auth.validate();
		if (!session) {
			return fail(401);
		}
		await auth.invalidateSession(session.sessionId); // invalidate session
		locals.auth.setSession(null); // remove cookie

		throw redirect(302, loginRoute); // redirect to login page
	},
};
