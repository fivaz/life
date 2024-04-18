<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import NewWeekList from './NewWeekList.svelte';

	export const meta = {
		argTypes: {},
		component: NewWeekList,
		parameters: {
			layout: 'fullscreen',
		},
	} satisfies Meta<NewWeekList>;
</script>

<Template let:args>
	<NewWeekList {...args} />
</Template>

<Story args={{}} name="Primary" />
