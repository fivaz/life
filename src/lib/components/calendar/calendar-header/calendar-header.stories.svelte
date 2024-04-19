<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import CalendarHeader from './CalendarHeader.svelte';

	export const meta = {
		argTypes: {},
		component: CalendarHeader,
		parameters: {
			layout: 'fullscreen',
		},
	} satisfies Meta<CalendarHeader>;
</script>

<script>
	import { startOfWeek } from 'date-fns';
</script>

<Template let:args>
	<CalendarHeader {...args}></CalendarHeader>
</Template>

<Story args={{ weekStart: startOfWeek(new Date()) }} name="Primary" />
