<script lang="ts" context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import SelectItem from './SelectItem.svelte';

	export const meta = {
		component: SelectItem,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered'
		}
	} satisfies Meta<SelectItem>;
</script>

<Template let:args>
	<SelectItem {...args} />
</Template>

<Story name="Primary" args={{}} />
