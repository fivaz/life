import { auth } from '$lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { writable } from 'svelte/store';

const nullUser = { uid: '' };
export const session = writable<User | { uid: string }>(nullUser);

onAuthStateChanged(auth, async (user) => {
	if (user) {
		session.set(user);
	} else {
		// User is signed out
		session.set(nullUser);
	}
});
