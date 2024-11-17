<script module lang="ts">
	import { defineMeta, setTemplate } from '@storybook/addon-svelte-csf';
	import type { ComponentProps } from 'svelte';

	import { birthdayToDo, toDos, workToDo } from '$lib/task/task.seed';

	import TasksSummary from './TasksSummary.svelte';

	const { Story } = defineMeta({
		component: TasksSummary,
		args: {
			date: new Date(),
		},
	});
</script>

<script lang="ts">
	
setTemplate(template as any);
</script>

{#snippet template({ ...args }: ComponentProps<typeof TasksSummary>)}
	<div class="w-24">
		<TasksSummary {...args} />
	</div>
{/snippet}

<Story args={{ tasks: [workToDo] }} name="OneDueToDo" />

<Story args={{ tasks: [birthdayToDo] }} name="OneToDo" />

<Story args={{ tasks: toDos }} name="ManyToDos" />
