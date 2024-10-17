import type { UserInfo } from 'firebase/auth';

import { DbPaTH } from '$lib/consts';
import { storage } from '$lib/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { writable } from 'svelte/store';

export async function storeAvatar(userId: string, file: Blob): Promise<string> {
	const avatarsRef = ref(storage, `${DbPaTH.AVATARS}/${userId}`);
	await uploadBytes(avatarsRef, file);
	return await getDownloadURL(avatarsRef);
}

export const currentUser = writable<Pick<
	UserInfo,
	'displayName' | 'email' | 'photoURL' | 'uid'
> | null>();

export function updateUser(displayName: null | string, photoURL: null | string) {
	currentUser.update((user) => user && { ...user, displayName, photoURL });
}
