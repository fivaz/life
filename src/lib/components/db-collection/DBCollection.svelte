<script lang="ts" generics="T">
	import { collection, onSnapshot } from 'firebase/firestore';
	import { DB_PATH } from '$lib/consts';
	import { db } from '$lib/firebase';
	import { currentUser } from '$lib/auth/utils';

	import type { Snippet } from 'svelte';
	import { type Unsubscribe } from 'firebase/firestore';
	import Loading from '$lib/components/loading/Loading.svelte';

	interface Props {
		segment: string;
		// eslint-disable-next-line no-undef
		data: Snippet<[T[], string]>;
		// eslint-disable-next-line no-undef
		type: T;
	}

	let { data, segment }: Props = $props();

	// eslint-disable-next-line no-undef
	let items = $state<T[]>([]);

	let isLoading = $state(true);

	$effect(() => {
		let unsubscribe: Unsubscribe = () => {};

		if ($currentUser) {
			const collectionRef = collection(db, `${DB_PATH.USERS}/${$currentUser.uid}/${segment}`);
			unsubscribe = onSnapshot(collectionRef, (snapshot) => {
				// eslint-disable-next-line no-undef
				items = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }) as T);
				isLoading = false;
			});
		}

		return () => unsubscribe();
	});
</script>

{#if isLoading}
	<Loading />
{:else if $currentUser}
	{@render data(items, $currentUser.uid)}
{/if}
