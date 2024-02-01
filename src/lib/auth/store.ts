import { auth } from '$lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { writable } from 'svelte/store';

export function sessionStore() {
	let unsubscribe: () => void;

	// Fallback for SSR
	if (!globalThis.window) {
		const { subscribe } = writable(null);
		return {
			subscribe,
		};
	}

	const { subscribe } = writable(auth.currentUser ?? null, (set) => {
		unsubscribe = onAuthStateChanged(auth, (user) => set(user));

		return () => unsubscribe();
	});

	return {
		subscribe,
	};
}
