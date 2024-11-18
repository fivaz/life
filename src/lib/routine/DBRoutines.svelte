<script lang="ts">
	import { collection, onSnapshot, type Unsubscribe } from 'firebase/firestore';
	import type { Snippet } from 'svelte';

	import Loading from '$lib/components/loading/Loading.svelte';
	import { DB_PATH } from '$lib/consts';
	import { db } from '$lib/firebase';
	import type { Routine } from '$lib/routine/routine.model';
	import { currentUser } from '$lib/user/user.utils.svelte';

	interface Props {
		data: Snippet<[Record<Routine['time'], Routine[]>, string]>;
	}

	let { data }: Props = $props();

	const emptyRoutineMap: Record<Routine['time'], Routine[]> = {
		morning: [],
		afternoon: [],
		evening: [],
		'all-day': [],
	};

	let routinesMap = $state<Record<Routine['time'], Routine[]>>(emptyRoutineMap);

	let isLoading = $state(true);

	$effect(() => {
		isLoading = true;
		let unsubscribe: Unsubscribe = () => {};

		if (currentUser.uid) {
			unsubscribe = onSnapshot(
				collection(db, `${DB_PATH.USERS}/${currentUser.uid}/${DB_PATH.ROUTINES}`),
				(snapshot) => {
					// Clear existing routines
					routinesMap = emptyRoutineMap;

					// Populate routines from the snapshot
					snapshot.docs.forEach((doc) => {
						const routine = { ...doc.data(), id: doc.id } as Routine;
						try {
							routinesMap[routine.time].push(routine);
						} catch (e) {
							console.log(e);
							console.log(routine);
						}
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
	{@render data(routinesMap, currentUser.uid)}
{/if}
