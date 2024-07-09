<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import ToDoList from './DayTasksList.svelte';

	export const meta = {
		argTypes: {},
		component: ToDoList,
	} satisfies Meta<ToDoList>;
</script>

<script>
	import { toDos } from '$lib/task/seed';
</script>

<Template let:args>
	<ToDoList {...args} />
</Template>

<Story args={{ toDos }} name="Primary" />
