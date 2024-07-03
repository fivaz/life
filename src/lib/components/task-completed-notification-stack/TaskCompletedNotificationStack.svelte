<script lang="ts">
	import type { AnyTask } from '$lib/task/utils';

	import TaskCompletedNotification from '$lib/components/task-completed-notification-stack/task-completed-notification/TaskCompletedNotification.svelte';
	import { SignedIn } from 'sveltefire';

	export let completedTasks: AnyTask[] = [];

	function removeNotification(index: number) {
		completedTasks = completedTasks.filter((_, i) => i !== index);
	}
</script>

<div
	aria-live="assertive"
	class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
>
	<div class="flex w-full flex-col items-center space-y-4 sm:items-end">
		<SignedIn let:user>
			{#each completedTasks as task, index (task.id)}
				<TaskCompletedNotification
					onRemove={() => removeNotification(index)}
					{task}
					userId={user.uid}
				/>
			{/each}
		</SignedIn>
	</div>
</div>
