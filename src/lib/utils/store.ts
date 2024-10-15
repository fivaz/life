import type { Auth, UserInfo } from 'firebase/auth';

import { writable } from 'svelte/store';

export const currentUser = writable<Auth['currentUser']>();

export function updateUser(displayName: null | string, photoURL: null | string) {
	currentUser.update((user) => user && { ...user, displayName, photoURL });
}

export type User = Pick<UserInfo, 'displayName' | 'photoURL'> | null;

export const title = writable<string>('Dashboard');