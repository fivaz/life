<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import HorizontalTime from './HorizontalTime.svelte';

	export const meta = {
		argTypes: {},
		component: HorizontalTime,
	} satisfies Meta<HorizontalTime>;
</script>

<Template let:args>
	<HorizontalTime {...args}><div /></HorizontalTime>
</Template>

<Story args={{}} name="Primary" />
