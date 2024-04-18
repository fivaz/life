<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import NewCalendarHeader from './NewCalendarHeader.svelte';

	export const meta = {
		argTypes: {},
		component: NewCalendarHeader,
		parameters: {
			layout: 'fullscreen',
		},
	} satisfies Meta<NewCalendarHeader>;
</script>

<script>
	import { startOfWeek } from 'date-fns';
</script>

<Template let:args>
	<NewCalendarHeader {...args}></NewCalendarHeader>
</Template>

<Story args={{ weekStart: startOfWeek(new Date()) }} name="Primary" />
