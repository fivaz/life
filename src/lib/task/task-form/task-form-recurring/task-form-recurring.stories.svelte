<script lang="ts" module>
	import { defineMeta, setTemplate } from '@storybook/addon-svelte-csf';

	import { longRecurring } from '$lib/task/task.seed';
	import { taskIn } from '$lib/task/task-form/service.svelte';
	import { convertToTaskIn } from '$lib/task/task-in-utils';

	import TaskFormRecurring from './TaskFormRecurring.svelte';

	const { Story } = defineMeta({
		component: TaskFormRecurring,
	});

	taskIn.value = convertToTaskIn(longRecurring);
</script>

<script lang="ts">
	setTemplate(template);
</script>

{#snippet template()}
	<div class="w-72 rounded-md bg-indigo-50 p-2">
		<TaskFormRecurring />
	</div>
{/snippet}

<Story name="Primary" args={{}} children={template} />
