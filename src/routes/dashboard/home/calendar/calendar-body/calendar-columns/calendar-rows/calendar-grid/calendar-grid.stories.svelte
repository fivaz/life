<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import CalendarGrid from './CalendarGrid.svelte';

	export const meta = {
		argTypes: {},
		component: CalendarGrid,
		parameters: {
			layout: 'centered',
		},
		tags: ['autodocs'],
	} satisfies Meta<CalendarGrid>;
</script>

<Template let:args>
	<div class="h-96 w-96">
		<CalendarGrid {...args} />
	</div>
</Template>

<Story args={{}} name="Primary" />
