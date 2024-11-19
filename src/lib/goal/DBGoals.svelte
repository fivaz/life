<script lang="ts">
	import { orderBy } from 'firebase/firestore';
	import type { Snippet } from 'svelte';

	import DBCollection from '$lib/components/db-collection/DBCollection.svelte';
	import { DB_PATH } from '$lib/consts';
	import { type Goal, goalSchema } from '$lib/goal/goal.model';

	interface Props {
		data: Snippet<[Goal[], string]>;
	}

	let { data: typedData }: Props = $props();

	let goalType: Goal;
</script>

<DBCollection
	collection={DB_PATH.GOALS}
	schema={goalSchema}
	type={goalType}
	constrains={orderBy('deadline')}
>
	{#snippet data(items, userId)}
		{@render typedData(items, userId)}
	{/snippet}
</DBCollection>
