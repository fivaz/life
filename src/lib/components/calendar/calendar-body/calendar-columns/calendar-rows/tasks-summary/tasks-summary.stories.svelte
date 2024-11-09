<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import { birthdayToDo, toDos, workToDo } from '$lib/task/seed';
	import { type Task } from '$lib/task/utils';

	import TasksSummary from './TasksSummary.svelte';

	const { Story } = defineMeta({
		component: TasksSummary,
	});
</script>

{#snippet template(args: { tasks: Task[] })}
	<div class="w-24">
		<TasksSummary date={new Date()} {...args} />
	</div>
{/snippet}

<Story args={{ tasks: [workToDo] }} name="OneDueToDo" children={template} />

<Story args={{ tasks: [birthdayToDo] }} name="OneToDo" children={template} />

<Story args={{ tasks: toDos }} name="ManyToDos" children={template} />
