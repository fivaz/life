<script lang="ts">
	import type { Goal } from '$lib/goal/utils';
	import { DB_PATH } from '$lib/consts';

	import type { Snippet } from 'svelte';
	import DBCollection from '$lib/components/db-collection/DBCollection.svelte';

	interface Props {
		data: Snippet<[Goal[], string]>;
	}

	let { data: typedData }: Props = $props();

	let goalType: Goal;
</script>

<DBCollection segment={DB_PATH.GOALS} type={goalType}>
	{#snippet data(items, userId)}
		{@render typedData(items, userId)}
	{/snippet}
</DBCollection>
