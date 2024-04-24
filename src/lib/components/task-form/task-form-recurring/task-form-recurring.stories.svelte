<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { convertToTaskIn } from '$lib/components/task-form/service';
	import { done } from '$lib/task/seed';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	import TaskFormRecurring from './TaskFormRecurring.svelte';

	export const meta = {
		argTypes: {},
		component: TaskFormRecurring,
	} satisfies Meta<TaskFormRecurring>;
</script>

<Template let:args>
	<div class="w-72">
		<TaskFormRecurring {...args} taskIn={convertToTaskIn(done)} />
	</div>
</Template>

<Story args={{}} name="Primary" />
