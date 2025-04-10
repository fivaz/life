<script lang="ts">
	import type { Task } from '@life/shared/task';
	import CircleCheck from '@lucide/svelte/icons/circle-check';
	import XIcon from '@lucide/svelte/icons/x';
	import { onMount } from 'svelte';

	import type { Goal } from '$lib/goal/goal.model';
	import {
		fetchPercentageComplete,
		slideFromRight,
	} from '$lib/task/task-completed-notification-stack/task-completed-notification/service';
	import { currentUser } from '$lib/user/user.utils.svelte';

	interface Props {
		task: Task;
		onRemove: () => void;
	}

	let { task, onRemove }: Props = $props();

	let percentage = $state(0);

	onMount(async () => {
		if (task.goal) {
			percentage = await fetchPercentageComplete(task as Task & { goal: Goal }, currentUser.uid);
		}

		setTimeout(() => {
			onRemove();
		}, 5000);
	});
</script>

<div
	class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
	transition:slideFromRight={{ duration: 500 }}
>
	<div class="p-4">
		<div class="flex items-start">
			<div class="flex-shrink-0">
				<CircleCheck class="size-6 text-green-400" aria-hidden="true" />
			</div>
			<div class="ml-3 w-0 flex-1 pt-0.5">
				{#if task.goal}
					<p class="text-sm font-medium text-gray-900">Mission Completed</p>
					{#if percentage === 100}
						<p class="mt-1 text-sm text-gray-500">
							"Hero's Glory! You've achieved 100% completion on your journey!"
						</p>
					{:else}
						<p class="mt-1 text-sm text-gray-500">
							"You're {percentage}% closer to conquering your quest! Fantastic progress!"
						</p>
					{/if}
				{:else}
					<p class="text-sm font-medium text-gray-900">Mission Completed</p>
					<p class="mt-1 text-sm text-gray-500">
						"Heroic Effort! You've successfully finished a task – well done!"
					</p>
				{/if}
			</div>
			<div class="ml-4 flex flex-shrink-0">
				<button
					class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
					onclick={onRemove}
					type="button"
				>
					<span class="sr-only">Close</span>
					<XIcon class="size-5" aria-hidden="true" />
				</button>
			</div>
		</div>
	</div>
</div>
