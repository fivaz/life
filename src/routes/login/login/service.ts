import { checkEmail } from '$lib/auth/utils';
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

	return '';
}

export function parseErrors(error: unknown) {
	if (error instanceof FirebaseError) {
		if (error.code === 'auth/invalid-credential') {
			return 'login or password are incorrect';
		} else if (error.code === 'auth/network-request-failed') {
			return "you can't login if you're not connected to the internet";
		} else {
			return error.message;
		}
	} else {
		console.error(error);
		return 'Unexpected error';
	}
}
