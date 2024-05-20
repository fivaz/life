<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import GoalIcon from './GoalIcon.svelte';

	export const meta = {
		argTypes: {},
		component: GoalIcon,
		parameters: {
			layout: 'fullscreen',
		},
	} satisfies Meta<GoalIcon>;
</script>

<Template let:args>
	<GoalIcon {...args} />
</Template>

<Story args={{}} name="Primary" />
