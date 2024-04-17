import { storage } from '$lib/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export async function storeAvatar(userId: string, file: Blob): Promise<string> {
	const avatarsRef = ref(storage, `avatars/${userId}`);
	await uploadBytes(avatarsRef, file);
	return await getDownloadURL(avatarsRef);
}
