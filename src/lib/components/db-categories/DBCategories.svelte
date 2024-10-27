<script lang="ts">
	import { collection, onSnapshot } from 'firebase/firestore';
	import type { Category } from '$lib/category/utils';
	import { DB_PATH } from '$lib/consts';
	import { db } from '$lib/firebase';
	import { currentUser } from '$lib/auth/utils';

	import type { Snippet } from 'svelte';
	import { type Unsubscribe } from 'firebase/firestore';
	import Loading from '$lib/components/loading/Loading.svelte';

	interface Props {
		data: Snippet<[string, Category[]]>;
	}

	let { data }: Props = $props();

	let categories = $state<Category[]>([]);

	let isLoading = $state(true);

	$effect(() => {
		let unsubscribe: Unsubscribe = () => {};

		if ($currentUser) {
			const categoriesRef = collection(
				db,
				`${DB_PATH.USERS}/${$currentUser.uid}/${DB_PATH.CATEGORIES}`,
			);
			unsubscribe = onSnapshot(categoriesRef, (snapshot) => {
				categories = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }) as Category);
				isLoading = false;
			});
		}

		return () => unsubscribe();
	});
</script>

{#if isLoading}
	<Loading />
{:else if $currentUser}
	{@render data($currentUser.uid, categories)}
{/if}
