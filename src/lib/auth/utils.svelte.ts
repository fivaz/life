import type { User } from 'firebase/auth';

import { DB_PATH } from '$lib/consts';
import { storage } from '$lib/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

type NewUser = {
	-readonly [K in keyof User]: User[K];
};

export async function storeAvatar(userId: string, file: Blob): Promise<string> {
	const avatarsRef = ref(storage, `${DB_PATH.AVATARS}/${userId}`);
	await uploadBytes(avatarsRef, file);
	return getDownloadURL(avatarsRef);
}

let _currentUser = $state<NewUser | null>(null);

export const currentUser = {
	get value() {
		return _currentUser;
	},
	set value(newUser) {
		_currentUser = newUser;
	},
};

export function updateUser(displayName: null | string, photoURL: null | string) {
	if (!_currentUser) return;
	_currentUser.displayName = displayName;
	_currentUser.photoURL = photoURL;
}

export function checkEmail(email: string): boolean {
	return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}
