import prisma from '$lib/prisma';
// eslint-disable-next-line import/no-nodejs-modules
import crypto from 'crypto';

const salt = 'random_salt_for_user';

export function saltAndHashPassword(password: string) {
	const hash = crypto.createHash('sha256');
	hash.update(password + salt);
	return hash.digest('hex');
}

export function getUser(email: string, hashedPassword: string) {
	return prisma.user.findFirst({
		where: {
			email,
			password: hashedPassword,
		},
	});
}
