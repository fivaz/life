import type { Category } from '@life/shared/category';
import { CATEGORY_WORK } from '@life/shared/category';
import { categorySchema } from '@life/shared/category';
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	orderBy,
	query,
	setDoc,
	updateDoc,
	where,
	writeBatch,
} from 'firebase/firestore';

import { DB_PATH } from '$lib/consts';
import { db } from '$lib/firebase';
import { fetchItems } from '$lib/repository.svelte';
import { getTaskPath } from '$lib/task/task.repository';

export function fetchCategories(categories: Category[]): void {
	console.log('fetchCategories');
	fetchItems(categories, DB_PATH.CATEGORIES, categorySchema, orderBy('order'));
}

export function getCategoryPath(userId: string) {
	return `${DB_PATH.USERS}/${userId}/${DB_PATH.CATEGORIES}`;
}

export function editCategory(category: Category, userId: string) {
	const categoryDocRef = doc(db, getCategoryPath(userId), category.id);
	const { id, ...categoryWithoutId } = category;
	void updateDoc(categoryDocRef, categoryWithoutId);
	void updateCategoryInTasks(category, userId);
}

async function updateCategoryInTasks(category: Category, userId: string) {
	const tasksQuery = query(
		collection(db, getTaskPath(userId)),
		where('category.id', '==', category.id),
	);

	const tasksSnapshot = await getDocs(tasksQuery);

	const batch = writeBatch(db);

	tasksSnapshot.forEach((taskDoc) => {
		const taskRef = taskDoc.ref;
		batch.update(taskRef, { category });
	});

	await batch.commit();
}

export function addCategory(category: Category, userId: string) {
	const newCategoryDocRef = doc(collection(db, getCategoryPath(userId)));
	const { id, ...categoryWithoutId } = category; // the id isn't part of the doc in firebase
	void setDoc(newCategoryDocRef, categoryWithoutId);
}

export function deleteCategory(id: string | undefined, userId: string, closeForm: () => void) {
	if (id) {
		const categoryDocRef = doc(db, getCategoryPath(userId), id);
		void deleteDoc(categoryDocRef);
		closeForm();
	}
}

export async function addDefaultCategories(userId: string) {
	const categoriesCollectionRef = collection(db, getCategoryPath(userId));

	const defaultCategories: Omit<Category, 'id'>[] = [
		{
			color: 'green',
			name: 'work',
			type: CATEGORY_WORK,
			order: 0,
		},
		{
			color: 'red',
			name: 'fun',
			type: 'fun',
			order: 1,
		},
		{
			color: 'blue',
			name: 'sleep',
			type: 'sleep',
			order: 2,
		},
	];

	defaultCategories.forEach((category) => {
		addDoc(categoriesCollectionRef, category);
	});
}

export async function updateCategoriesOrder(categories: Category[], userId: string) {
	const batch = writeBatch(db);

	categories.forEach(({ id, order }) => {
		const routineRef = doc(db, getCategoryPath(userId), id);
		batch.update(routineRef, { order });
	});

	try {
		await batch.commit();
	} catch (error) {
		console.error('Error in batch update: ', error);
	}
}
