<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import RoutineRows from './RoutineRows.svelte';

	export const meta = {
		argTypes: {},
		component: RoutineRows,
		parameters: {
			layout: 'fullscreen',
		},
	} satisfies Meta<RoutineRows>;
</script>

<Template let:args>
	<RoutineRows {...args} />
</Template>

<Story args={{}} name="Primary" />
