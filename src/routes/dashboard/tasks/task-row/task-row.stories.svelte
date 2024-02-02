<script lang="ts" context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import { tasks } from '$lib/task/seed';
	import TaskRow from './TaskRow.svelte';

	export const meta = {
		component: TaskRow,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
		},
	} satisfies Meta<TaskRow>;
</script>

<script>
</script>

<Template let:args>
	<div class="w-[500px]">
		<TaskRow {...args} />
	</div>
</Template>

<Story name="Primary" args={{ task: tasks[0], form: null }} />
