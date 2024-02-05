<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { startOfWeek } from 'date-fns';

	import CalendarColumns from './CalendarColumns.svelte';

	export const meta = {
		component: CalendarColumns,
		parameters: {
			layout: 'centered',
		},
		tags: ['autodocs'],
	} satisfies Meta<CalendarColumns>;
</script>

<Template let:args>
	<div class="w-[800px]">
		<CalendarColumns {...args} />
	</div>
</Template>

<Story
	args={{
		weekStart: startOfWeek(new Date()),
	}}
	name="Desktop"
/>
