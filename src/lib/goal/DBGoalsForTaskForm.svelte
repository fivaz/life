<script lang="ts">
	import { where } from 'firebase/firestore';
	import type { Snippet } from 'svelte';

	import DBCollection from '$lib/components/db-collection/DBCollection.svelte';
	import { DB_PATH } from '$lib/consts';
	import type { Goal } from '$lib/goal/goal.model';
	import { goalSchema } from '$lib/goal/goal.model';

	interface Props {
		data: Snippet<[Goal[], string]>;
	}

	let { data: typedData }: Props = $props();

	let goalType: Goal;

	function sortGoals(goals: Goal[]): Goal[] {
		return goals.toSorted((a, b) => a.deadline.localeCompare(b.deadline));
	}
</script>

<DBCollection
	constrains={where('isDone', '==', false)}
	schema={goalSchema}
	segment={DB_PATH.GOALS}
	type={goalType}
>
	{#snippet data(items, userId)}
		{@render typedData(sortGoals(items), userId)}
	{/snippet}
</DBCollection>
