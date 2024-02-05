<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import SlimCollection from './SlimCollection.svelte';

	export const meta = {
		component: SlimCollection,
		parameters: {
			layout: 'centered',
		},
		tags: ['autodocs'],
	} satisfies Meta<SlimCollection>;
</script>

<Template let:args>
	<SlimCollection {...args} />
</Template>

<Story args={{}} name="Primary" />
