<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import LucideIcons from './LucideIcons.svelte';

	export const meta = {
		argTypes: {},
		component: LucideIcons,
		parameters: {
			layout: 'fullscreen',
		},
	} satisfies Meta<LucideIcons>;
</script>

<Template let:args>
	<LucideIcons {...args} />
</Template>

<Story args={{}} name="Primary" />
