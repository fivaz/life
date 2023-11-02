<script lang="ts" context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import { startOfWeek } from 'date-fns';
	import CalendarBody from './CalendarBody.svelte';

	export const meta = {
		component: CalendarBody,
		tags: ['autodocs'],
		parameters: {
			layout: 'fullscreen',
		},
		argTypes: {},
	} satisfies Meta<CalendarBody>;
</script>

<Template let:args>
	<div class="h-screen w-screen">
		<CalendarBody {...args} />
	</div>
</Template>

<Story
	name="Primary"
	args={{
		weekStart: startOfWeek(new Date()),
	}}
/>
