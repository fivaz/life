<script lang="ts">
	import type { TaskIn } from '$lib/components/task-form/service';

	import ConfirmButton from '$lib/components/confirm-button/ConfirmButton.svelte';
	import { XSquare } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { clsx } from 'clsx';
	export let taskIn: TaskIn;

	let newSubTask = '';

	function addSubTask() {
		taskIn.subTasks = [
			...taskIn.subTasks,
			{ id: Math.floor(Math.random() * 1000), isDone: false, name: newSubTask },
		];
		newSubTask = '';
	}

	function removeSubTask(id: number) {
		taskIn.subTasks = taskIn.subTasks.filter((subTask) => subTask.id !== id);
	}
</script>

<div class="flex flex-col gap-3">
	{#if taskIn.subTasks.length}
		<ul>
			{#each taskIn.subTasks as subTask (subTask.id)}
				<li class="flex items-center gap-2 px-2">
					<span class={clsx('grow text-sm text-gray-700', { 'line-through': subTask.isDone })}>
						{subTask.name}
					</span>
					<input
						bind:checked={subTask.isDone}
						class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
						type="checkbox"
					/>
					<ConfirmButton color="none" on:confirm={() => removeSubTask(subTask.id)} type="button">
						<Icon class="h-4 w-4 text-red-600" src={XSquare} />
					</ConfirmButton>
				</li>
			{/each}
		</ul>
	{/if}
	<input
		bind:value={newSubTask}
		class="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
		on:keydown={(e) => {
			if (e.key === 'Enter') {
				addSubTask();
				e.preventDefault();
			}
		}}
		placeholder="enter new task..."
		type="text"
	/>
</div>
