import type { Category } from '$lib/category/utils';
import type { EventDispatcher } from 'svelte';

import { tailwindColors, types } from '$lib/category/utils';
import { db } from '$lib/firebase';
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';

export function buildEmptyCategory() {
	return {
		color: Object.keys(tailwindColors)[0],
		id: '',
		isDefault: false,
		name: '',
		type: types[0] as string,
	};
}

export function editCategory(id: string, data: Omit<Category, 'id'>, userId: string) {
	const categoryDocRef = doc(db, 'users', userId, 'categories', id);
	return updateDoc(categoryDocRef, data);
}

export function addCategory(data: Omit<Category, 'id'>, userId: string) {
	const categoriesCollectionRef = collection(db, 'users', userId, 'categories');
	return addDoc(categoriesCollectionRef, data);
}

export async function deleteCategory(
	id: string | undefined,
	userId: string,
	dispatch: EventDispatcher<{ close: null }>,
) {
	if (id) {
		const categoryDocRef = doc(db, 'users', userId, 'categories', id);
		await deleteDoc(categoryDocRef);
		dispatch('close');
	}
}
