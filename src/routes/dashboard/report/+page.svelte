<script lang="ts">
	import { auth, db } from '$lib/firebase';
	import { type AnyTask } from '$lib/task/utils';
import { type Writable, writable } from 'svelte/store';
	import { collectionStore, userStore } from 'sveltefire';

	import ReportTasksByTime from './ReportTasksByTime.svelte';

	let tasksStore: ReturnType<typeof collectionStore<AnyTask>> | Writable<AnyTask[]> = writable<
		AnyTask[]
	>([]);

	const user = userStore(auth);

	$: {
		if ($user) {
			tasksStore = collectionStore<AnyTask>(db, `users/${$user.uid}/tasks`);
		}
	}
</script>

<div class="py-4">
	<pre>{$tasksStore.length}</pre>
	<ReportTasksByTime tasks={$tasksStore} />
</div>
