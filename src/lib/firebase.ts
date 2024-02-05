import {
	PUBLIC_FIREBASE_API_KEY,
	PUBLIC_FIREBASE_APP_ID,
	PUBLIC_FIREBASE_AUTH_DOMAIN,
	PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	PUBLIC_FIREBASE_PROJECT_ID,
	PUBLIC_FIREBASE_STORAGE_BUCKET,
} from '$env/static/public';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
	getFirestore,
	initializeFirestore,
	persistentLocalCache,
	persistentMultipleTabManager,
} from 'firebase/firestore';

// Your web app's Firebase configuration
const config = {
	apiKey: PUBLIC_FIREBASE_API_KEY,
	appId: PUBLIC_FIREBASE_APP_ID,
	authDomain: PUBLIC_FIREBASE_AUTH_DOMAIN,
	messagingSenderId: PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	projectId: PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: PUBLIC_FIREBASE_STORAGE_BUCKET,
};

// Initialize Firebase
let app;
if (getApps().length) {
	app = getApp();
} else {
	app = initializeApp(config);
	initializeFirestore(app, {
		localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
	});
}

export const db = getFirestore(app);
export const auth = getAuth(app);
