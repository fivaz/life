<script lang="ts">
	import { orderBy, where } from 'firebase/firestore';
	import type { Snippet } from 'svelte';

	import DBCollection from '$lib/components/db-collection/DBCollection.svelte';
	import { DB_PATH } from '$lib/consts';
	import type { Goal } from '$lib/goal/goal.model';

	interface Props {
		data: Snippet<[Goal[], string]>;
	}

	let { data: typedData }: Props = $props();

	let goalType: Goal;
</script>

<DBCollection
	collection={DB_PATH.GOALS}
	type={goalType}
	constrains={[orderBy('deadline'), where('isDone', '==', false)]}
>
	{#snippet data(items, userId)}
		{@render typedData(items, userId)}
	{/snippet}
</DBCollection>
