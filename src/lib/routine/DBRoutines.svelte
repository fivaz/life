<script lang="ts">
	import type { Routine } from '$lib/routine/utils';
	import { DB_PATH } from '$lib/consts';

	import type { Snippet } from 'svelte';
	import DBCollection from '$lib/components/db-collection/DBCollection.svelte';
	import { orderBy } from 'firebase/firestore';

	interface Props {
		data: Snippet<[Routine[], string]>;
	}

	let { data: typedData }: Props = $props();

	let routineType: Routine;
</script>

<DBCollection segment={DB_PATH.ROUTINES} type={routineType} constrain={orderBy('order')}>
	{#snippet data(items, userId)}
		{@render typedData(items, userId)}
	{/snippet}
</DBCollection>
