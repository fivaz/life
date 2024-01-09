<script lang="ts" context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import { events } from '$lib/task/seed.js';
	import ToDo from './+page.svelte';

	export const meta = {
		component: ToDo,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
		},
	} satisfies Meta<ToDo>;
</script>

<Template let:args>
	<div class="w-96">
		<ToDo {...args} />
	</div>
</Template>

<Story name="Primary" args={{ data: { toDos: events, form: null } }} />
