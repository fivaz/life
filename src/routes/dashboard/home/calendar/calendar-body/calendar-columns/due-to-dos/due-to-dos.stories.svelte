<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import DueToDos from './DueToDos.svelte';

	export const meta = {
		component: DueToDos,
		parameters: {
			layout: 'centered',
		},
		tags: ['autodocs'],
	} satisfies Meta<DueToDos>;
</script>

<Template let:args>
	<DueToDos {...args} />
</Template>

<Story args={{}} name="Primary" />
