<script lang="ts">
	import { CategoryTypes } from '$lib/category/utils';
	import { DB_PATH } from '$lib/consts';
	import { db } from '$lib/firebase';
	import { type AnyTask } from '$lib/task/utils';
	import { currentUser } from '$lib/user/utils';
	import { title } from '$lib/utils';
	import { type Unsubscribe, collection, onSnapshot, query, where } from 'firebase/firestore';
	import { onDestroy } from 'svelte';
	
import ReportTasksByTime from './report-tasks-by-time/ReportTasksByTime.svelte';

	let tasks: AnyTask[] = [];
	let unsubscribe: Unsubscribe | undefined;

	export function fetchWorkTasks(userId: string) {
		const tasksRef = collection(db, `${DB_PATH.USERS}/${userId}/${DB_PATH.TASKS}`);
		const q = query(tasksRef, where('category.type', '==', CategoryTypes.WORK));

		if (unsubscribe) unsubscribe(); // Unsubscribe from previous listener

		unsubscribe = onSnapshot(q, (snapshot) => {
			tasks = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as AnyTask);
		});
	}

	$: {
		if ($currentUser) fetchWorkTasks($currentUser.uid);
	}

	onDestroy(() => {
		if (unsubscribe) unsubscribe();
	});

	title.set('Report');
</script>

<div class="py-4">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<!-- We've used 3xl here, but feel free to try other max-widths based on your needs -->
		<h1 class="hidden text-2xl font-bold text-gray-900 md:block">{$title}</h1>
		<ReportTasksByTime {tasks} />
	</div>
</div>
