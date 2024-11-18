<script lang="ts">
	import { collection, onSnapshot, orderBy, type Unsubscribe } from 'firebase/firestore';
	import type { Snippet } from 'svelte';

	import DBCollection from '$lib/components/db-collection/DBCollection.svelte';
	import Loading from '$lib/components/loading/Loading.svelte';
	import { DB_PATH } from '$lib/consts';
	import { db } from '$lib/firebase';
	import type { Routine } from '$lib/routine/routine.model';
	import { currentUser } from '$lib/user/user.utils.svelte';

	interface Props {
		data: Snippet<[Record<Routine['time'], Routine[]>, string]>;
	}

	let { data }: Props = $props();

	let routines = $state<Record<Routine['time'], Routine[]>>({
		morning: [],
		afternoon: [],
		evening: [],
		'all-day': [],
	});

	let isLoading = $state(true);

	$effect(() => {
		isLoading = true;
		let unsubscribe: Unsubscribe = () => {};

		if (currentUser.uid) {
			unsubscribe = onSnapshot(
				collection(db, `${DB_PATH.USERS}/${currentUser.uid}/${DB_PATH.ROUTINES}`),
				(snapshot) => {
					snapshot.docs.forEach((doc) => {
						const routine = { ...doc.data(), id: doc.id } as Routine;
						routines[routine.time].push(routine);
					});
					isLoading = false;
				},
			);
		}

		return () => unsubscribe();
	});
</script>

{#if isLoading}
	<Loading />
{:else if currentUser.uid}
	{@render data(routines, currentUser.uid)}
{/if}
