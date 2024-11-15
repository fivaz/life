<script lang="ts">
	import type { Task } from '$lib/task/task.model';
	import TaskCompletedNotification from '$lib/task/task-completed-notification-stack/task-completed-notification/TaskCompletedNotification.svelte';

	interface Props {
		completedTasks?: Task[];
		userId: string;
	}

	let { userId, completedTasks = $bindable([]) }: Props = $props();

	function removeNotification(index: number) {
		completedTasks = completedTasks.filter((_, i) => i !== index);
	}
</script>

<div
	aria-live="assertive"
	class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
>
	<div class="flex w-full flex-col items-center space-y-4 sm:items-end">
		{#each completedTasks as task, index (task.id)}
			<TaskCompletedNotification onRemove={() => removeNotification(index)} {task} {userId} />
		{/each}
	</div>
</div>
