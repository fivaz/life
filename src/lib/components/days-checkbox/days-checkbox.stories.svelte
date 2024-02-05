<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import DaysCheckbox from './DaysCheckbox.svelte';

	export const meta = {
		component: DaysCheckbox,
		parameters: {
			layout: 'centered',
		},
		tags: ['autodocs'],
	} satisfies Meta<DaysCheckbox>;
</script>

<Template let:args>
	<DaysCheckbox {...args} />
</Template>

<Story args={{}} name="Primary" />
