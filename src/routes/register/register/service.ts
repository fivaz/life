import { checkEmail } from '$lib/auth/utils';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '$lib/firebase';
import { DB_PATH } from '$lib/consts';
import { FirebaseError } from 'firebase/app';

export function validateFields(email: string, password: string): string {
	if (!email) {
		return 'Email is required';
	}
	if (!checkEmail(email)) {
		return 'Invalid email address';
	}
	if (!password) {
		return 'Password is required';
	}

	if (password.length < 6) {
		return 'Password should be at least 6 characters';
	}

	return '';
}

export async function addDefaultCategories(userId: string) {
	// TODO when one select a category as default, make all other non default
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

export function parseErrors(error: unknown) {
	if (error instanceof FirebaseError) {
		if (error.code === 'auth/email-already-in-use') {
			return 'This email is already in use';
		} else {
			return error.message;
		}
	} else {
		console.error(error);
		return 'Unexpected error';
	}
}
