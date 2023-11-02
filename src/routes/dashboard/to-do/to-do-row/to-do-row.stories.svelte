<script lang="ts" context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import { toDos } from '$lib/to-do/seed';
	import ToDoRow from './ToDoRow.svelte';

	export const meta = {
		component: ToDoRow,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
		},
	} satisfies Meta<ToDoRow>;
</script>

<Template let:args>
	<div class="w-96">
		<ToDoRow {...args} />
	</div>
</Template>

<Story name="Primary" args={{ toDo: toDos[0] }} />
