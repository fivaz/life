<script lang="ts" generics="T">
	import type { CollectionReference, Query } from 'firebase/firestore';
	import type { Snippet } from 'svelte';

	import { db } from '$lib/firebase';
	import { type Readable, derived } from 'svelte/store';
	import { collectionStore } from 'sveltefire';

	interface Props {
		ref: CollectionReference | Query | string;
		type: T;
		data: Snippet<[T[]]>;
	}

	let { type, ref, data }: Props = $props();

	const raw = collectionStore(db, ref) as Readable<Array<typeof type & { ref: never }>>;

	const dataStore = derived(raw, (raw) => {
		return raw.map(({ ref, ...data }) => data as typeof type);
	});
</script>

{#if $dataStore}
	{@render data($dataStore)}
{/if}
