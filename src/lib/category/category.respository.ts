import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	query,
	setDoc,
	updateDoc,
	where,
	writeBatch,
} from 'firebase/firestore';

import type { Category } from '$lib/category/category.model';
import { DB_PATH } from '$lib/consts';
import { db } from '$lib/firebase';

export function editCategory(id: string, data: Omit<Category, 'id'>, userId: string) {
	const categoryDocRef = doc(db, DB_PATH.USERS, userId, DB_PATH.CATEGORIES, id);
	void updateDoc(categoryDocRef, data);
	void updateCategoryInTasks(id, data, userId);
	if (data.isDefault) {
		void resetDefaultCategories(id, userId);
	}
}

async function updateCategoryInTasks(id: string, data: Omit<Category, 'id'>, userId: string) {
	const tasksQuery = query(
		collection(db, DB_PATH.USERS, userId, DB_PATH.TASKS),
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
	const newCategoryDocRef = doc(collection(db, DB_PATH.USERS, userId, DB_PATH.CATEGORIES));
	void setDoc(newCategoryDocRef, data);
	if (data.isDefault) {
		void resetDefaultCategories(newCategoryDocRef.id, userId);
	}
}

async function resetDefaultCategories(exceptId: string, userId: string) {
	const categoryQuery = query(
		collection(db, DB_PATH.USERS, userId, DB_PATH.CATEGORIES),
		where('isDefault', '==', true),
	);

	const categoriesSnapshot = await getDocs(categoryQuery);

	const batch = writeBatch(db);

	categoriesSnapshot.forEach((categoryDoc) => {
		if (categoryDoc.id !== exceptId) {
			batch.update(categoryDoc.ref, { isDefault: false });
		}
	});

	await batch.commit();
}

export function deleteCategory(id: string | undefined, userId: string, closeForm: () => void) {
	if (id) {
		const categoryDocRef = doc(db, DB_PATH.USERS, userId, DB_PATH.CATEGORIES, id);
		void deleteDoc(categoryDocRef);
		closeForm();
	}
}

export async function addDefaultCategories(userId: string) {
	const categoriesCollectionRef = collection(db, DB_PATH.USERS, userId, DB_PATH.CATEGORIES);
	void addDoc(categoriesCollectionRef, {
		color: 'green',
		isDefault: true,
		name: 'work',
		type: 'work',
	});
	void addDoc(categoriesCollectionRef, {
		color: 'blue',
		isDefault: false,
		name: 'sleep',
		type: 'sleep',
	});
	void addDoc(categoriesCollectionRef, {
		color: 'red',
		isDefault: false,
		name: 'fun',
		type: 'fun',
	});
}