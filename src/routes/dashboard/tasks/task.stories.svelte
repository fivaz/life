<script lang="ts" context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import { tasks } from '$lib/task/seed.js';
	import Task from './+page.svelte';

	export const meta = {
		component: Task,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
		},
	} satisfies Meta<Task>;
</script>

<Template let:args>
	<div class="w-96">
		<Task {...args} />
	</div>
</Template>

<Story name="Primary" args={{ data: { tasks, form: null } }} />
