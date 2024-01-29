<script lang="ts" context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import DueToDos from './DueToDos.svelte';

	export const meta = {
		component: DueToDos,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
		},
	} satisfies Meta<DueToDos>;
</script>

<Template let:args>
	<DueToDos {...args} />
</Template>

<Story name="Primary" args={{}} />
