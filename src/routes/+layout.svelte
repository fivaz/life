<script lang="ts">
	import '../app.css';

	import { auth, db } from '$lib/firebase';
	import { authStore } from '$lib/store/store';
	import { getDoc, doc, setDoc } from 'firebase/firestore';
	import { onMount } from 'svelte';

	const nonAuthRoutes = ['/', 'product'];

	onMount(() => {
		console.log('Mounting');
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			const currentPath = window.location.pathname;

			if (!user && !nonAuthRoutes.includes(currentPath)) {
				window.location.href = '/';
				return;
			}

			if (user && currentPath === '/') {
				window.location.href = '/todo';
				return;
			}

			if (!user) {
				return;
			}

			let dataToSetToStore;
			const docRef = doc(db, 'users', user.uid);
			const docSnap = await getDoc(docRef);
			if (!docSnap.exists()) {
				console.log('Creating User');
				const userRef = doc(db, 'users', user.uid);
				dataToSetToStore = {
					email: user.email,
					todos: [],
				};
				await setDoc(userRef, dataToSetToStore, { merge: true });
			} else {
				console.log('Fetching User');
				const userData = docSnap.data();
				dataToSetToStore = userData;
			}

			authStore.update((curr) => {
				return {
					...curr,
					user,
					data: dataToSetToStore,
					loading: false,
				};
			});
		});
		return unsubscribe;
	});
</script>

<html lang="en" class="h-full">
	<body class="h-full">
		<slot />
	</body>
</html>
