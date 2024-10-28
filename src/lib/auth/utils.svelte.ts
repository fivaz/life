import { DB_PATH } from '$lib/consts';
import { storage } from '$lib/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { type User as FirebaseUser } from 'firebase/auth';

export async function storeAvatar(userId: string, file: Blob): Promise<string> {
	const avatarsRef = ref(storage, `${DB_PATH.AVATARS}/${userId}`);
	await uploadBytes(avatarsRef, file);
	return getDownloadURL(avatarsRef);
}

export type User = { displayName: string; email: string; uid: string; photoURL: string };

export const currentUser = $state<User>({
	displayName: '',
	email: '',
	uid: '',
	photoURL: '',
});

export function setUser(user: FirebaseUser | null) {
	currentUser.displayName = user?.displayName || '';
	currentUser.uid = user?.uid || '';
	currentUser.photoURL = user?.photoURL || '';
	currentUser.email = user?.email || '';
}

export function updateUser(displayName: string, photoURL: string) {
	currentUser.displayName = displayName;
	currentUser.photoURL = photoURL;
}

export function checkEmail(email: string): boolean {
	return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}
