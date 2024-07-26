<script lang="ts">
	import { CategoryTypes } from '$lib/category/utils';
	import { DbPaTH } from '$lib/consts';
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
					collection(db, `${DbPaTH.USERS}/${$user.uid}/${DbPaTH.TASKS}`),
					where('category.type', '==', CategoryTypes.WORK),
				) as Query<AnyTask>,
			);
		}
	}
</script>

<div class="py-4">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<!-- We've used 3xl here, but feel free to try other max-widths based on your needs -->

		<h1 class="text-lg font-semibold leading-7 text-gray-900">Report</h1>
		<ReportTasksByTime tasks={$tasksStore} />
	</div>
</div>
