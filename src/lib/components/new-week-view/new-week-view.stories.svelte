<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import NewWeekView from './NewWeekView.svelte';

	export const meta = {
		argTypes: {},
		component: NewWeekView,
		parameters: {
			layout: 'fullscreen',
		},
	} satisfies Meta<NewWeekView>;
</script>

<Template let:args>
	<div class="h-screen">
		<NewWeekView {...args} />
	</div>
</Template>

<Story args={{}} name="Primary" />
