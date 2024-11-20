<script lang="ts">
	import { where } from 'firebase/firestore';
	import type { Snippet } from 'svelte';

	import DBCollection from '$lib/components/db-collection/DBCollection.svelte';
	import { DB_PATH } from '$lib/consts';
	import type { Task } from '$lib/task/task.model';
	import { taskSchema } from '$lib/task/task.model';

	interface Props {
		data: Snippet<[Task[], string]>;
	}

	let { data: typedData }: Props = $props();

	let taskType: Task;
</script>

<DBCollection
	collection={DB_PATH.TASKS}
	constrains={where('isDone', '==', false)}
	schema={taskSchema}
	type={taskType}
>
	{#snippet data(items, userId)}
		{@render typedData(items, userId)}
	{/snippet}
</DBCollection>
