<script lang="ts">
	import type { Goal } from '$lib/goal/utils';
	import type { AnyTask } from '$lib/task/utils';

	import Button from '$lib/components/button/Button.svelte';
	import ProgressBar from '$lib/components/progress-bar/ProgressBar.svelte';
	import { Settings } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { clsx } from 'clsx';
	import { createEventDispatcher } from 'svelte';

	import GoalTasks from './goal-tasks/GoalTasks.svelte';

	export let goal: Goal;
	export let tasks: AnyTask[];

	$: tasksCompleted = tasks.reduce((total, task) => total + Number(task.isDone), 0);

	let dispatch = createEventDispatcher<{ edit: Goal; remove: Goal }>();
</script>

<li class="rounded-lg border p-3 text-sm font-semibold leading-6 text-blue-500 shadow">
	<div class={'flex items-center justify-between gap-x-6'}>
		<h3
			class={clsx(
				{ 'line-through': goal.isDone },
				'text-base font-semibold leading-6 text-gray-900',
			)}
		>
			{goal.name}
		</h3>

		<div>
			<!--			<Button-->
			<!--				on:click={() => {-->
			<!--					showForm = true;-->
			<!--					editingTask = buildEmptyTask($categories, goal.id);-->
			<!--				}}-->
			<!--				type="button"-->
			<!--			>-->
			<!--				<Icon src={Plus} class="h-4 w-4" />-->
			<!--			</Button>-->
			<Button on:click={() => dispatch('edit', goal)} type="button">
				<Icon class="h-4 w-4" src={Settings} />
			</Button>
		</div>
	</div>

	<div>
		{#if tasks.length}
			<ProgressBar maxValue={tasks.length} value={tasksCompleted} />
			<GoalTasks {goal} {tasks} />
		{:else}
			<div class="text-red-500">No tasks yet</div>
		{/if}
	</div>
</li>
