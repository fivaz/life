<script lang="ts" module>
	import { birthdayToDo, toDos, workToDo } from '@life/shared/task';
	import { defineMeta, setTemplate } from '@storybook/addon-svelte-csf';
	import type { ComponentProps } from 'svelte';

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

<Story name="OneDueToDo" args={{ tasks: [workToDo] }} />

<Story name="OneToDo" args={{ tasks: [birthdayToDo] }} />

<Story name="ManyToDos" args={{ tasks: toDos }} />
