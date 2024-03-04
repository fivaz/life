<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import Banner from './Banner.svelte';

	export const meta = {
		component: Banner,
		parameters: {
			layout: 'centered',
		},
		tags: ['autodocs'],
	} satisfies Meta<Banner>;
</script>

<Template let:args>
	<Banner {...args}></Banner>
</Template>

<Story args={{}} name="Primary" />
