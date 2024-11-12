<!--routify:meta reset="dashboard+" -->
<script lang="ts">
	import { where } from 'firebase/firestore';

	import { CategoryTypes } from '$lib/category/utils';
	import DBCollection from '$lib/components/db-collection/DBCollection.svelte';
	import { DB_PATH } from '$lib/consts';
	import { type Task } from '$lib/task/utils';
	import { title } from '$lib/utils.svelte.js';

	import ReportTasksByTime from './report-tasks-by-time/ReportTasksByTime.svelte';

	let taskType: Task;

	title.value = 'Report';
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
