<script lang="ts">
	import TaskCompletedNotification from '$lib/components/task-completed-notification/TaskCompletedNotification.svelte';
	import { notifications } from '$lib/components/task-completed-notification-stack/service';
	import { SignedIn } from 'sveltefire';

	function removeNotification(index: number) {
		notifications.update((tasks) => tasks.filter((_, i) => i !== index));
	}
</script>

<div
	aria-live="assertive"
	class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
>
	<div class="flex w-full flex-col items-center space-y-4 sm:items-end">
		<SignedIn let:user>
			{#each $notifications as task, index (task.id)}
				<TaskCompletedNotification
					onRemove={() => removeNotification(index)}
					{task}
					userId={user.uid}
				/>
			{/each}
		</SignedIn>
	</div>
</div>
