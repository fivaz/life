import type { Query, QueryConstraint, QuerySnapshot, Unsubscribe } from 'firebase/firestore';
import { collection, onSnapshot, query } from 'firebase/firestore';
import type { ZodSchema } from 'zod';

import { DB_PATH } from '$lib/consts';
import { db } from '$lib/firebase';
import { currentUser } from '$lib/user/user.utils.svelte';

export function fetchItems<I>(
	handleItems: I[] | ((items: I[]) => void),
	segment: string,
	zodSchema: ZodSchema,
	...constrains: QueryConstraint[]
): void {
	$effect(() => {
		let unsubscribe: Unsubscribe = () => {};

		if (currentUser.uid) {
			unsubscribe = fetchItemsCore(handleItems, segment, zodSchema, ...constrains);
		}

		return () => unsubscribe();
	});
}

export function fetchItemsCore<I>(
	handleItems: I[] | ((items: I[]) => void),
	segment: string,
	zodSchema: ZodSchema,
	...constrains: QueryConstraint[]
) {
	return onSnapshot(
		getQuery(segment, ...constrains),
		(snapshot) => {
			const items = populate<I>(snapshot, zodSchema);
			if (typeof handleItems === 'function') {
				handleItems(items);
			} else {
				handleItems.splice(0, handleItems.length, ...items);
			}
		},
		(error) => console.error(`error while fetching data from ${segment}`, error),
	);
}

export function getQuery(segment: string, ...constrains: QueryConstraint[]): Query {
	const collectionRef = collection(db, `${DB_PATH.USERS}/${currentUser.uid}/${segment}`);

	if (constrains) {
		return query(collectionRef, ...constrains);
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
		// items.push(item);
	});

	return items;
}
