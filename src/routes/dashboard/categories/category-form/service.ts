import { tailwindColors, types } from '$lib/category/utils';
import type { Category } from '$lib/category/utils';
import { createModal } from '$lib/components/dialog/service';
import { db } from '$lib/firebase';
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import type { EventDispatcher } from 'svelte';

export function buildEmptyCategory() {
	return {
		name: '',
		isDefault: false,
		color: Object.keys(tailwindColors)[0],
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
	const result = await createModal({ title: 'Are you sure?' });
	if (result && id) {
		const categoryDocRef = doc(db, 'users', userId, 'categories', id);
		await deleteDoc(categoryDocRef);
		dispatch('close');
	}
}
