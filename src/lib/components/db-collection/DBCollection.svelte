<script lang="ts" generics="T">
	import { collection, onSnapshot, query, type QueryConstraint, Query } from 'firebase/firestore';
	import { DB_PATH } from '$lib/consts';
	import { db } from '$lib/firebase';
	import { currentUser } from '$lib/auth/utils.svelte';

	import type { Snippet } from 'svelte';
	import { type Unsubscribe } from 'firebase/firestore';
	import Loading from '$lib/components/loading/Loading.svelte';

	interface Props {
		collection: string;
		constrain?: QueryConstraint;
		// eslint-disable-next-line no-undef
		data: Snippet<[T[], string]>;
		// eslint-disable-next-line no-undef
		type: T;
	}

	let { data, collection: segment, constrain }: Props = $props();

	// eslint-disable-next-line no-undef
	let items = $state<T[]>([]);

	let isLoading = $state(true);

	function getQuery(userId: string): Query {
		const collectionRef = collection(db, `${DB_PATH.USERS}/${userId}/${segment}`);

		if (constrain) {
			return query(collectionRef, constrain);
		} else {
			return collectionRef;
		}
	}

	$effect(() => {
		let unsubscribe: Unsubscribe = () => {};

		if (currentUser.value) {
			unsubscribe = onSnapshot(getQuery(currentUser.value.uid), (snapshot) => {
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
{:else if currentUser.value}
	{@render data(items, currentUser.value.uid)}
{/if}
