<script lang="ts">
	import { auth, db } from '$lib/firebase';
	import { FirebaseApp } from 'sveltefire';
	import { onMount, type Snippet } from 'svelte';
	import '../app.css';
	import { onAuthStateChanged } from 'firebase/auth';
	import { setUser } from '$lib/auth/utils.svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	onMount(() => {
		onAuthStateChanged(auth, (user) => {
			setUser(user);
		});
	});
</script>

<FirebaseApp {auth} firestore={db}>
	{@render children()}
</FirebaseApp>
