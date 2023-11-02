<script lang="ts" context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import { events } from '$lib/event/seed';
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
	<div class="w-96">
		<ToDoRow {...args} />
	</div>
</Template>

<Story name="Primary" args={{ toDo: events[0] }} />
