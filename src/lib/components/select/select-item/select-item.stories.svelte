<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import SelectItem from './SelectItem.svelte';

	export const meta = {
		component: SelectItem,
		parameters: {
			layout: 'centered',
		},
		tags: ['autodocs'],
	} satisfies Meta<SelectItem>;
</script>

<Template let:args>
	<SelectItem {...args} />
</Template>

<Story args={{}} name="Primary" />
