<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import Streak from './Streak.svelte';

	export const meta = {
		argTypes: {},
		component: Streak,
		parameters: {
			layout: 'fullscreen',
		},
	} satisfies Meta<Streak>;
</script>

<Template let:args>
	<Streak {...args} />
</Template>

<Story args={{}} name="Primary" />
