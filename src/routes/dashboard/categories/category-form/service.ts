import type { Category, GroupType } from '$lib/category/utils';
import type { EventDispatcher } from 'svelte';

import { tailwindColors, types } from '$lib/category/utils';
import { db } from '$lib/firebase';
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	query,
	updateDoc,
	where,
	writeBatch,
} from 'firebase/firestore';

export function buildEmptyCategory() {
	return {
		color: Object.keys(tailwindColors)[0],
		id: '',
		isDefault: false,
		name: '',
		type: types[0] as GroupType,
	};
}

export function editCategory(id: string, data: Omit<Category, 'id'>, userId: string) {
	const categoryDocRef = doc(db, 'users', userId, 'categories', id);
	void updateDoc(categoryDocRef, data);
	void updateCategoryInTasks(id, data, userId);
}

async function updateCategoryInTasks(id: string, data: Omit<Category, 'id'>, userId: string) {
	const tasksQuery = query(
		collection(db, 'users', userId, 'tasks'),
		where('category.id', '==', id),
	);

	const tasksSnapshot = await getDocs(tasksQuery);

	const batch = writeBatch(db);

	tasksSnapshot.forEach((taskDoc) => {
		const taskRef = taskDoc.ref;
		batch.update(taskRef, { category: data });
	});

	await batch.commit();
}

export function addCategory(data: Omit<Category, 'id'>, userId: string) {
	const categoriesCollectionRef = collection(db, 'users', userId, 'categories');
	void addDoc(categoriesCollectionRef, data);
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
