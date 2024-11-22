import type { Query, QueryConstraint, QuerySnapshot, Unsubscribe } from 'firebase/firestore';
import { collection, onSnapshot, query } from 'firebase/firestore';
import type { ZodSchema } from 'zod';

import { DB_PATH } from '$lib/consts';
import { db } from '$lib/firebase';
import { currentUser } from '$lib/user/user.utils.svelte';

export function getQuery(segment: string, constrains?: QueryConstraint): Query {
	const collectionRef = collection(db, `${DB_PATH.USERS}/${currentUser.uid}/${segment}`);

	if (constrains) {
		return query(collectionRef, constrains);
	} else {
		return collectionRef;
	}
}

function populate<I>(snapshot: QuerySnapshot, schema: ZodSchema) {
	const items: I[] = [];

	snapshot.docs.forEach((doc) => {
		const item = { ...doc.data(), id: doc.id };

		const validation = schema.safeParse(item);

		if (!validation.success) {
			console.warn(`validation failed: ${item.id}, ${validation.error}`);
		} else {
			items.push(validation.data);
		}
	});

	return items;
}

export function fetchItems<I>(
	callback: ((items: I[]) => void) | I[],
	segment: string,
	zodSchema: ZodSchema,
	constrains?: QueryConstraint,
): void {
	$effect(() => {
		let unsubscribe: Unsubscribe = () => {};

		if (currentUser.uid) {
			unsubscribe = onSnapshot(getQuery(segment, constrains), (snapshot) => {
				const items = populate<I>(snapshot, zodSchema);
				if (typeof callback === 'function') {
					callback(items);
				} else {
					callback.splice(0, callback.length, ...items);
				}
			});
		}

		return () => unsubscribe();
	});
}
