import { checkEmail, storeAvatar } from '$lib/auth/utils.svelte';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { auth, db } from '$lib/firebase';
import { DB_PATH } from '$lib/consts';
import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword, updateProfile, type User } from 'firebase/auth';

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

export async function register(
	displayName: string,
	email: string,
	password: string,
	avatar: string,
) {
	const { user } = await createUserWithEmailAndPassword(auth, email, password);

	return createUser(user, displayName, email, avatar);
}

export async function createUser(user: User, displayName: string, email: string, avatar: string) {
	const photoURL = await storeAvatar(
		user.uid,
		new Blob([avatar], { type: 'image/svg+xml;charset=utf-8' }),
	);

	await updateProfile(user, { displayName, photoURL });

	await createUserInDB(user.uid, displayName, email, photoURL);
}

async function createUserInDB(
	userId: string,
	displayName: string,
	email: string,
	photoURL: string,
) {
	const userRef = doc(db, DB_PATH.USERS, userId);

	await setDoc(userRef, {
		displayName,
		email,
		photoURL,
	});

	await addDefaultCategories(userId);
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
