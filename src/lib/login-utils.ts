import prisma from '$lib/prisma';
// import crypto from 'crypto';

export function saltAndHashPassword(password: string) {
	return password;
	// const salt = crypto.randomBytes(16).toString('hex');
	//
	// const iterations = 10000; // You can adjust the number of iterations based on your security requirements
	// const keylen = 64; // The length of the generated key
	//
	// const hashedPassword = crypto.pbkdf2Sync(password, salt, iterations, keylen, 'sha512');
	// return hashedPassword.toString('hex');
}

export function getUser(email: string, hashedPassword: string) {
	return prisma.user.findFirst({
		where: {
			email,
			password: hashedPassword,
		},
	});
}
