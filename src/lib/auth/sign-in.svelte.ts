import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, db, storage } from '$lib/firebase';
import { DB_PATH, Routes } from '$lib/consts';
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup, type User } from 'firebase/auth';
import { parseErrors } from '../../routes/login/login/service';
import { doc, getDoc } from 'firebase/firestore';
import { minidenticon } from 'minidenticons';
import { createUser } from '../../routes/register/register/service';
import { goto } from '$app/navigation';

export async function storeAvatar(userId: string, file: Blob): Promise<string> {
	const avatarsRef = ref(storage, `${DB_PATH.AVATARS}/${userId}`);
	await uploadBytes(avatarsRef, file);
	return getDownloadURL(avatarsRef);
}

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

	return goto(Routes.ROOT);
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
