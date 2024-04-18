<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import NewHorizontalTime from './NewHorizontalTime.svelte';

	export const meta = {
		argTypes: {},
		component: NewHorizontalTime,
	} satisfies Meta<NewHorizontalTime>;
</script>

<Template let:args>
	<NewHorizontalTime {...args}><div /></NewHorizontalTime>
</Template>

<Story args={{}} name="Primary" />
