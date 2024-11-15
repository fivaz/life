import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword, updateProfile, type User } from 'firebase/auth';

import { auth } from '$lib/firebase';
import { checkEmail } from '$lib/user/sign-in.utils.svelte.js';
import { storeAvatar } from '$lib/user/user.repository';
import { createUserInDB } from '$lib/user/user.repository';

export function validateFields(email: string, password: string): string {
	if (!email) {
		return 'Email is required';
	}
	if (!checkEmail(email)) {
		return 'Invalid email address';
	}
	if (!password) {
		return 'Password is required';
	}

	if (password.length < 6) {
		return 'Password should be at least 6 characters';
	}

	return '';
}

export function parseErrors(error: unknown) {
	if (error instanceof FirebaseError) {
		if (error.code === 'auth/email-already-in-use') {
			return 'This email is already in use';
		} else {
			return error.message;
		}
	} else {
		console.error(error);
		return 'Unexpected error';
	}
}

export async function register(
	displayName: string,
	email: string,
	password: string,
	avatar: string,
) {
	const { user } = await createUserWithEmailAndPassword(auth, email, password);

	return createUser(user, displayName, email, avatar);
}

export async function createUser(user: User, displayName: string, email: string, avatar: string) {
	const photoURL = await storeAvatar(
		user.uid,
		new Blob([avatar], { type: 'image/svg+xml;charset=utf-8' }),
	);

	await updateProfile(user, { displayName, photoURL });

	await createUserInDB(user.uid, displayName, email, photoURL);
}
