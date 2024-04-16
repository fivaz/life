<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { tasks } from '$lib/task/seed.js';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	import Task from './+page.svelte';

	export const meta = {
		component: Task,
	} satisfies Meta<Task>;
</script>

<Template let:args>
	<div class="w-96">
		<Task {...args} />
	</div>
</Template>

<Story args={{ data: { form: null, tasks } }} name="Primary" />
