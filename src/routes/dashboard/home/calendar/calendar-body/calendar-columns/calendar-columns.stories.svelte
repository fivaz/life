<script lang="ts" context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import { startOfWeek } from 'date-fns';
	import CalendarColumns from './CalendarColumns.svelte';

	export const meta = {
		component: CalendarColumns,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
		},
	} satisfies Meta<CalendarColumns>;
</script>

<Template let:args>
	<div class="w-[800px]">
		<CalendarColumns {...args} />
	</div>
</Template>

<Story
	name="Desktop"
	args={{
		weekStart: startOfWeek(new Date()),
	}}
/>
