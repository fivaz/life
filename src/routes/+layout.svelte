<script lang="ts">
	import { auth, db } from '$lib/firebase';
	import { FirebaseApp } from 'sveltefire';
	import type { Snippet } from 'svelte';
	import '../app.css';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<FirebaseApp {auth} firestore={db}>
	{@render children?.()}
</FirebaseApp>
