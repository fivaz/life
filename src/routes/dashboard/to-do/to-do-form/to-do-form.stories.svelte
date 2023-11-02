<script lang="ts" context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import ToDoForm from './ToDoForm.svelte';

	export const meta = {
		component: ToDoForm,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
		},
	} satisfies Meta<ToDoForm>;
</script>

<Template let:args>
	<ToDoForm {...args} />
</Template>

<Story
	name="Primary"
	args={{
		form: null,
	}}
/>
