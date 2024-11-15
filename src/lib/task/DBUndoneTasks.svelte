<script lang="ts">
	import { where } from 'firebase/firestore';
	import type { Snippet } from 'svelte';

	import DBCollection from '$lib/components/db-collection/DBCollection.svelte';
	import { DB_PATH } from '$lib/consts';
	import type { Task } from '$lib/task/task.model';

	interface Props {
		data: Snippet<[Task[], string]>;
	}

	let { data: typedData }: Props = $props();

	let taskType: Task;
</script>

<DBCollection constrains={where('isDone', '==', false)} collection={DB_PATH.TASKS} type={taskType}>
	{#snippet data(items, userId)}
		{@render typedData(items, userId)}
	{/snippet}
</DBCollection>
