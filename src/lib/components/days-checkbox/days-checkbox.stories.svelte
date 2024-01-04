<script lang="ts" context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import DaysCheckbox from './DaysCheckbox.svelte';

	export const meta = {
		component: DaysCheckbox,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
		},
	} satisfies Meta<DaysCheckbox>;
</script>

<Template let:args>
	<DaysCheckbox {...args} />
</Template>

<Story name="Primary" args={{}} />
