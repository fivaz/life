<script lang="ts" context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import { toDos } from '$lib/to-do/seed';
	import ToDo from './+page.svelte';

	export const meta = {
		component: ToDo,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
		},
	} satisfies Meta<ToDo>;
</script>

<script>
</script>

<Template let:args>
	<div class="w-96">
		<ToDo {...args} />
	</div>
</Template>

<Story name="Primary" args={{ data: { toDos, form: null } }} />
