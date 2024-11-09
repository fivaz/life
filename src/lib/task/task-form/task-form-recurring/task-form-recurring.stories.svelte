<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import { longRecurring } from '$lib/task/seed';

	import TaskFormRecurring from './TaskFormRecurring.svelte';

	const { Story } = defineMeta({
		component: TaskFormRecurring,
	});

	import { convertToTaskIn } from '$lib/task/task-in-utils';

	let taskInDaily = $state(convertToTaskIn(longRecurring));

	let taskInWeekly = $state({ ...convertToTaskIn(longRecurring), recurringFrequency: 'weekly' });
</script>

{#snippet template(args: any)}
	<div class="w-72 rounded-md bg-indigo-50 p-2">
		<TaskFormRecurring {...args} />
	</div>
{/snippet}

<Story args={{ taskIn: taskInDaily }} name="Daily frequency" children={template} />

<Story args={{ taskIn: taskInWeekly }} name="Weekly frequency" children={template} />
