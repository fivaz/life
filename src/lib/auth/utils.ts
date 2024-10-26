import type { Auth } from 'firebase/auth';

import { DB_PATH } from '$lib/consts';
import { storage } from '$lib/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { writable } from 'svelte/store';

export async function storeAvatar(userId: string, file: Blob): Promise<string> {
	const avatarsRef = ref(storage, `${DB_PATH.AVATARS}/${userId}`);
	await uploadBytes(avatarsRef, file);
	return getDownloadURL(avatarsRef);
}

export const currentUser = writable<Auth['currentUser']>();

export function updateUser(displayName: null | string, photoURL: null | string) {
	currentUser.update((user) => user && { ...user, displayName, photoURL });
}

export function checkEmail(email: string): boolean {
	return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}
