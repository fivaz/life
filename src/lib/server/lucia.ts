import { prisma } from '@lucia-auth/adapter-prisma';
import { PrismaClient } from '@prisma/client';
// eslint-disable-next-line import/no-unresolved
import { dev } from '$app/environment';
import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';

//TODO check if I need to use import { PrismaClient } from "@prisma/client/edge"; when deploying to Vercel

const client = new PrismaClient();
export const auth = lucia({
	env: dev ? 'DEV' : 'PROD',
	middleware: sveltekit(),
	adapter: prisma(client),

	getUserAttributes: (data) => {
		return {
			username: data.username,
		};
	},
});

export type Auth = typeof auth;
