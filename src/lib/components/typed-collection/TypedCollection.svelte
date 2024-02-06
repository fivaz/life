<script generics="T" lang="ts">
	import type { CollectionReference, Query } from 'firebase/firestore';

	import { db } from '$lib/firebase';
	import { type Readable, derived } from 'svelte/store';
	import { collectionStore } from 'sveltefire';
	// eslint-disable-next-line no-undef
	export let type: T;

	export let ref: CollectionReference | Query | string;

	const raw = collectionStore(db, ref) as Readable<Array<typeof type & { ref: never }>>;

	const dataStore = derived(raw, (raw) => {
		return raw.map(({ ref, ...data }) => data as typeof type);
	});
</script>

{#if $dataStore}
	<slot data={$dataStore} {type} />
{:else}
	<slot name="loading" />
{/if}
