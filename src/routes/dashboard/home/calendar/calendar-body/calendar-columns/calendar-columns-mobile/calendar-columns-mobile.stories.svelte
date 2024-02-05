<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { addDays } from 'date-fns';

	import CalendarColumnsMobile from './CalendarColumnsMobile.svelte';

	export const meta = {
		argTypes: {},
		component: CalendarColumnsMobile,
		parameters: {
			layout: 'centered',
		},
		tags: ['autodocs'],
	} satisfies Meta<CalendarColumnsMobile>;
</script>

<Template let:args>
	<div class="w-[800px] h-[800px]">
		<CalendarColumnsMobile {...args} />
	</div>
</Template>

<Story
	args={{
		dates: Array.from({ length: 7 }, (_, i) => addDays(new Date(), i)),
	}}
	name="Primary"
/>
