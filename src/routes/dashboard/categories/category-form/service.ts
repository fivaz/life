import type { EventDispatcher } from 'svelte';

import { type Category, type CategoryType, CategoryTypes } from '$lib/category/utils';
import { tailwindColors } from '$lib/category/utils';
import { DbPaTH } from '$lib/consts';
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
		type: Object.values(CategoryTypes)[0] as CategoryType,
	};
}

export function editCategory(id: string, data: Omit<Category, 'id'>, userId: string) {
	const categoryDocRef = doc(db, DbPaTH.USERS, userId, DbPaTH.CATEGORIES, id);
	void updateDoc(categoryDocRef, data);
	void updateCategoryInTasks(id, data, userId);
}

async function updateCategoryInTasks(id: string, data: Omit<Category, 'id'>, userId: string) {
	const tasksQuery = query(
		collection(db, DbPaTH.USERS, userId, DbPaTH.TASKS),
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
	const categoriesCollectionRef = collection(db, DbPaTH.USERS, userId, DbPaTH.CATEGORIES);
	void addDoc(categoriesCollectionRef, data);
}

export async function deleteCategory(
	id: string | undefined,
	userId: string,
	dispatch: EventDispatcher<{ close: null }>,
) {
	if (id) {
		const categoryDocRef = doc(db, DbPaTH.USERS, userId, DbPaTH.CATEGORIES, id);
		await deleteDoc(categoryDocRef);
		dispatch('close');
	}
}
