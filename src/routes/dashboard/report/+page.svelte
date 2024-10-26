<script lang="ts">
	import { CategoryTypes } from '$lib/category/utils';
	import TypedCollection from '$lib/components/typed-collection2/TypedCollection.svelte';
	import { DB_PATH } from '$lib/consts';
	import { db } from '$lib/firebase';
	import { type Task } from '$lib/task/utils';
	import { title } from '$lib/utils';
	import { collection, query, where } from 'firebase/firestore';
	import { SignedIn } from 'sveltefire';

	import ReportTasksByTime from './report-tasks-by-time/ReportTasksByTime.svelte';

	function queryWorkTasks(userId: string) {
		const tasksRef = collection(db, `${DB_PATH.USERS}/${userId}/${DB_PATH.TASKS}`);
		return query(tasksRef, where('category.type', '==', CategoryTypes.WORK));
	}

	let taskType: Task;

	title.set('Report');
</script>

<div class="py-4">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<h1 class="hidden text-2xl font-bold text-gray-900 md:block">{$title}</h1>
		<SignedIn let:user>
			<TypedCollection ref={queryWorkTasks(user.uid)} type={taskType}>
				{#snippet data(tasks)}
					<ReportTasksByTime {tasks} />
				{/snippet}
			</TypedCollection>
		</SignedIn>
	</div>
</div>
