import { type User as FirebaseUser } from 'firebase/auth';

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
