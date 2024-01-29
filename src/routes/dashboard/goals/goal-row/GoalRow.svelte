<script lang="ts">
	import { Plus } from '@steeze-ui/heroicons';
	import { Settings } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { categories } from '$lib/category/store';
	import Button from '$lib/components/button/Button.svelte';
	import GoalTasks from '$lib/components/goal-tasks/GoalTasks.svelte';
	import ProgressBar from '$lib/components/progress-bar/ProgressBar.svelte';
	import { buildEmptyTaskIn } from '$lib/components/task-form/service';
	import type { TaskIn } from '$lib/components/task-form/service';
	import TaskForm from '$lib/components/task-form/TaskForm.svelte';
	import type { GGoal, GoalWithTasks } from '$lib/goal/utils';
	import classnames from 'classnames';
	import { createEventDispatcher } from 'svelte';

	export let goal: GoalWithTasks;

	$: tasksCompleted = goal.tasks.reduce((total, task) => total + Number(task.isDone), 0);

	let dispatch = createEventDispatcher<{ edit: GGoal; remove: GGoal }>();

	let editingTask: TaskIn = buildEmptyTaskIn([], goal.id);

	let showForm = false;
</script>

<li class="rounded-lg p-3 bg-neutral-100 text-blue-500 text-sm font-semibold leading-6">
	<div class={'gap-x-6 flex items-center justify-between'}>
		<div class={classnames({ 'line-through': goal.isDone })}>
			{goal.name}
		</div>

		<div>
			<Button
				on:click={() => {
					showForm = true;
					editingTask = buildEmptyTaskIn($categories, goal.id);
				}}
				type="button"
			>
				<Icon src={Plus} class="h-4 w-4" />
			</Button>
			<Button on:click={() => dispatch('edit', goal)} type="button">
				<Icon src={Settings} class="h-4 w-4" />
			</Button>
		</div>
	</div>

	<div>
		{#if goal.tasks.length}
			<ProgressBar value={tasksCompleted} maxValue={goal.tasks.length} />
			<GoalTasks {goal} />
		{:else}
			<div class="text-red-500">No tasks yet</div>
		{/if}
	</div>

	<TaskForm show={showForm} task={editingTask} on:close={() => (showForm = false)} />
</li>
