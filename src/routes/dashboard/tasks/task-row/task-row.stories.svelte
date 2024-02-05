<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { tasks } from '$lib/task/seed';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	import TaskRow from './TaskRow.svelte';

	export const meta = {
		component: TaskRow,
		parameters: {
			layout: 'centered',
		},
		tags: ['autodocs'],
	} satisfies Meta<TaskRow>;
</script>

<script>
</script>

<Template let:args>
	<div class="w-[500px]">
		<TaskRow {...args} />
	</div>
</Template>

<Story args={{ form: null, task: tasks[0] }} name="Primary" />
