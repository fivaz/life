<script lang="ts">
	import { CategoryTypes } from '$lib/category/utils';
	import { DB_PATH } from '$lib/consts';
	import { type Task } from '$lib/task/utils';

	import { where } from 'firebase/firestore';

	import ReportTasksByTime from './report-tasks-by-time/ReportTasksByTime.svelte';
	import { title } from '$lib/utils.svelte';
	import DBCollection from '$lib/components/db-collection/DBCollection.svelte';

	let taskType: Task;
</script>

<DBCollection
	collection={DB_PATH.TASKS}
	constrain={where('category.type', '==', CategoryTypes.WORK)}
	type={taskType}
>
	{#snippet data(tasks)}
		<div class="py-4">
			<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<h1 class="hidden text-2xl font-bold text-gray-900 md:block">{title.value}</h1>

				<ReportTasksByTime {tasks} />
			</div>
		</div>
	{/snippet}
</DBCollection>
