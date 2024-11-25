import type { User as FirebaseUser } from 'firebase/auth';

import type { User } from '$lib/user/user.model';

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
