<script lang="ts">
	import { session } from '$lib/auth/store';
	import { db } from '$lib/firebase';
	import type { Firestore } from 'firebase/firestore';
	import { doc, addDoc, collection, getDocs } from 'firebase/firestore';

	async function getCategories(db: Firestore) {
		const citiesCol = collection(db, 'categories');
		const citySnapshot = await getDocs(citiesCol);
		return citySnapshot.docs.map((doc) => doc.data());
	}

	async function addCategory(userId: string) {
		const userDocRef = doc(db, 'users', userId);
		console.log(userDocRef);

		const categoriesCollectionRef = collection(userDocRef, 'categories');

		const newCategory = {
			name: 'your-category-name',
			// other fields...
		};

		void addDoc(categoriesCollectionRef, newCategory);
	}
</script>

<h1>root</h1>

<button on:click={() => addCategory($session.uid)}> add category</button>
