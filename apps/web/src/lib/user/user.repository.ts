import { doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { addDefaultCategories } from '$lib/category/category.respository';
import { DB_PATH } from '$lib/consts';
import { db, storage } from '$lib/firebase';

export async function createUserInDB(
	userId: string,
	displayName: string,
	email: string,
	photoURL: string,
) {
	const userRef = doc(db, DB_PATH.USERS, userId);

	await setDoc(userRef, {
		displayName,
		email,
		photoURL,
	});

	await addDefaultCategories(userId);
}

export async function storeAvatar(userId: string, file: Blob): Promise<string> {
	const avatarsRef = ref(storage, `${DB_PATH.AVATARS}/${userId}`);
	await uploadBytes(avatarsRef, file);
	return getDownloadURL(avatarsRef);
}
