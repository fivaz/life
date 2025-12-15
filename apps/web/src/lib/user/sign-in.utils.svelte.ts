import type { User } from 'firebase/auth';
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { minidenticon } from 'minidenticons';

import { goto } from '$app/navigation';
import { resolve } from '$app/paths';
import { DB_PATH } from '$lib/consts';
import { auth, db } from '$lib/firebase';

import { parseErrors } from '../../routes/login/login/service';
import { createUser } from '../../routes/register/register/service';

export function checkEmail(email: string): boolean {
	return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

export const errorMessage = $state<{ value: string }>({ value: '' });

export const isLoading = $state<{ email: boolean; google: boolean; github: boolean }>({
	email: false,
	google: false,
	github: false,
});

export async function googleSignIn() {
	isLoading.google = true;
	try {
		const provider = new GoogleAuthProvider();
		const result = await signInWithPopup(auth, provider);
		await handleProviderLogin(result.user);
	} catch (error) {
		errorMessage.value = parseErrors(error);
	} finally {
		isLoading.google = false;
	}
}

async function handleProviderLogin(user: User) {
	const userRef = doc(db, DB_PATH.USERS, user.uid);
	const docSnap = await getDoc(userRef);
	if (!docSnap.exists()) {
		if (!user.email) {
			throw Error("google didn't return user's email");
		}

		const avatar = minidenticon(user.email, 95, 45);

		await createUser(user, user.displayName || 'unnamed user', user.email, avatar);
	}

	return goto(resolve('/'));
}

export async function githubSignIn() {
	isLoading.github = true;
	try {
		const provider = new GithubAuthProvider();
		const result = await signInWithPopup(auth, provider);
		await handleProviderLogin(result.user);
	} catch (error) {
		errorMessage.value = parseErrors(error);
	} finally {
		isLoading.github = false;
	}
}
