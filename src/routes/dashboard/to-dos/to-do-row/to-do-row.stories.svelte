<script lang="ts" context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import { events } from '$lib/task/seed';
	import ToDoRow from './ToDoRow.svelte';

	export const meta = {
		component: ToDoRow,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
		},
	} satisfies Meta<ToDoRow>;
</script>

<script>
</script>

<Template let:args>
	<div class="w-[500px]">
		<ToDoRow {...args} />
	</div>
</Template>

<Story name="Primary" args={{ toDo: events[0], form: null }} />
