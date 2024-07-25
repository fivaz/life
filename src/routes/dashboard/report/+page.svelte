<script lang="ts">
	import { auth, db } from '$lib/firebase';
	import { type AnyTask, queryUncompletedTasks } from '$lib/task/utils';
	import { collectionStore, userStore } from 'sveltefire';
	const user = userStore(auth);

	let tasks: ReturnType<typeof collectionStore<AnyTask>>;

	$: {
		if ($user) {
			tasks = collectionStore<AnyTask>(db, queryUncompletedTasks($user.uid));
		}
	}
</script>

<div class="py-4">
	<!--	<Line data={...} />-->
</div>
