import { fail } from '@sveltejs/kit';
import { saltAndHashPassword } from '$lib/login-utils';
import prisma from '$lib/prisma';
import type { Actions } from '../../../.svelte-kit/types/src/routes/dashboard/home/$types';

export const actions = {
	default: async ({ request }) => {
		try {
			const data = await request.formData();
			const name = data.get('name') as string;
			const email = data.get('email') as string;
			const password = data.get('password') as string;

			const hashedPassword = saltAndHashPassword(password);

			await prisma.user.create({
				data: {
					name,
					email,
					password: hashedPassword,
				},
			});

			return { saved: { email, password } };
		} catch (error) {
			console.log(error);
			return fail(422, {
				error: error instanceof Error ? error.message : 'unknown error',
			});
		}
	},
} satisfies Actions;
