<script lang="ts" module>
	import { birthdayToDo, toDos, workToDo } from '@life/shared/task';
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import type { ComponentProps } from 'svelte';

	import TasksSummary from './TasksSummary.svelte';

	const { Story } = defineMeta({
		component: TasksSummary,
		render: template,
		args: {
			date: new Date(),
		},
	});

	type Args = ComponentProps<typeof TasksSummary>;
</script>

{#snippet template({ ...args }: Args)}
	<div class="w-24">
		<TasksSummary {...args} />
	</div>
{/snippet}

<Story name="OneDueToDo" args={{ tasks: [workToDo] }} />

<Story name="OneToDo" args={{ tasks: [birthdayToDo] }} />

<Story name="ManyToDos" args={{ tasks: toDos }} />
