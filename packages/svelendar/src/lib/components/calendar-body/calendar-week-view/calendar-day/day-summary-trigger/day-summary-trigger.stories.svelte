<script lang="ts" module>
	import { birthdayToDo, toDos, workToDo } from '@life/shared/task';
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import type { ComponentProps } from 'svelte';

	import DaySummaryTrigger from './DaySummaryTrigger.svelte';

	const { Story } = defineMeta({
		component: DaySummaryTrigger,
		render: template,
		args: {
			date: new Date(),
		},
	});

	type Args = ComponentProps<typeof DaySummaryTrigger>;
</script>

{#snippet template({ ...args }: Args)}
	<div class="w-24">
		<DaySummaryTrigger {...args} />
	</div>
{/snippet}

<Story name="OneDueToDo" args={{ tasks: [workToDo] }} />

<Story name="OneToDo" args={{ tasks: [birthdayToDo] }} />

<Story name="ManyToDos" args={{ tasks: toDos }} />
