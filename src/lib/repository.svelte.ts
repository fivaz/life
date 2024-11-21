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

function populate<T>(snapshot: QuerySnapshot, items: Array<T>, schema: ZodSchema) {
	snapshot.docs.forEach((doc) => {
		const item = { ...doc.data(), id: doc.id };

		const validation = schema.safeParse(item);

		if (!validation.success) {
			console.warn(`validation failed: ${item.id}, ${validation.error}`);
		} else {
			items.push(validation.data);
		}
	});
}

export function fetchItems<I>(
	items: Array<I>,
	segment: string,
	zodSchema: ZodSchema,
	constrains?: QueryConstraint,
): void {
	$effect(() => {
		let unsubscribe: Unsubscribe = () => {};

		if (currentUser.uid) {
			unsubscribe = onSnapshot(getQuery(segment, constrains), (snapshot) =>
				populate(snapshot, items, zodSchema),
			);
		}

		return () => unsubscribe();
	});
}
