<script lang="ts">
	import { CategoryTypes } from '$lib/category/utils';
	import { auth, db } from '$lib/firebase';
	import { type AnyTask } from '$lib/task/utils';
	import { type Query, collection, query, where } from 'firebase/firestore';
	import { type Writable, writable } from 'svelte/store';
	import { collectionStore, userStore } from 'sveltefire';

	import ReportTasksByTime from './report-tasks-by-time/ReportTasksByTime.svelte';

	let tasksStore: ReturnType<typeof collectionStore<AnyTask>> | Writable<AnyTask[]> = writable<
		AnyTask[]
	>([]);

	const user = userStore(auth);

	$: {
		if ($user) {
			tasksStore = collectionStore<AnyTask>(
				db,
				query(
					collection(db, `users/${$user.uid}/tasks`),
					where('category.type', '==', CategoryTypes.WORK),
				) as Query<AnyTask>,
			);
		}
	}
</script>

<div class="py-4">
	<ReportTasksByTime tasks={$tasksStore} />
</div>
