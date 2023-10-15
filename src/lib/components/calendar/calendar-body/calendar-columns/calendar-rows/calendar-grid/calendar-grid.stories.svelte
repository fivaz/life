<script lang="ts" context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import CalendarGrid from './CalendarGrid.svelte';

	export const meta = {
		component: CalendarGrid,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered'
		},
		argTypes: {}
	} satisfies Meta<CalendarGrid>;
</script>

<Template let:args>
	<div class="h-96 w-96">
		<CalendarGrid {...args} />
	</div>
</Template>

<Story name="Primary" args={{}} />
