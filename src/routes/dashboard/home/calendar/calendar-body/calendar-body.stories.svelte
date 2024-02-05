<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { startOfWeek } from 'date-fns';

	import CalendarBody from './CalendarBody.svelte';

	export const meta = {
		argTypes: {},
		component: CalendarBody,
		parameters: {
			layout: 'fullscreen',
		},
		tags: ['autodocs'],
	} satisfies Meta<CalendarBody>;
</script>

<Template let:args>
	<div class="h-screen w-screen">
		<CalendarBody {...args} />
	</div>
</Template>

<Story
	args={{
		weekStart: startOfWeek(new Date()),
	}}
	name="Primary"
/>
