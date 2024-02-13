<script lang="ts">
	import type { Goal } from '$lib/goal/utils';
	import type { AnyTask } from '$lib/task/utils';

	import Button from '$lib/components/button/Button.svelte';
	import GoalTasks from '$lib/components/goal-tasks/GoalTasks.svelte';
	import ProgressBar from '$lib/components/progress-bar/ProgressBar.svelte';
	import { Settings } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import classnames from 'classnames';
	import { createEventDispatcher } from 'svelte';

	export let goal: Goal;
	export let tasks: AnyTask[];

	$: tasksCompleted = tasks.reduce((total, task) => total + Number(task.isDone), 0);

	let dispatch = createEventDispatcher<{ edit: Goal; remove: Goal }>();

	// let editingTask: TaskIn = buildEmptyTask([], goal.id);

	let showForm = false;
</script>

<li class="rounded-lg p-3 bg-neutral-100 text-blue-500 text-sm font-semibold leading-6">
	<div class={'gap-x-6 flex items-center justify-between'}>
		<div class={classnames({ 'line-through': goal.isDone })}>
			{goal.name}
		</div>

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
			<GoalTasks {tasks} />
		{:else}
			<div class="text-red-500">No tasks yet</div>
		{/if}
	</div>

	<!--	<TaskForm show={showForm} task={editingTask} on:close={() => (showForm = false)} />-->
</li>
