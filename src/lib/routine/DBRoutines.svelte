<script lang="ts">
	import { orderBy } from 'firebase/firestore';
	import type { Snippet } from 'svelte';

	import DBCollection from '$lib/components/db-collection/DBCollection.svelte';
	import { DB_PATH } from '$lib/consts';
	import type { Routine } from '$lib/routine/routine.model';

	interface Props {
		data: Snippet<[Routine[], string]>;
	}

	let { data: typedData }: Props = $props();

	let routineType: Routine;
</script>

<DBCollection collection={DB_PATH.ROUTINES} type={routineType} constrains={orderBy('order')}>
	{#snippet data(items, userId)}
		{@render typedData(items, userId)}
	{/snippet}
</DBCollection>
