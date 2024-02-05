<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { addDays } from 'date-fns';

	import CalendarColumnsDesktop from './CalendarColumnsDesktop.svelte';

	export const meta = {
		component: CalendarColumnsDesktop,
		parameters: {
			layout: 'centered',
		},
		tags: ['autodocs'],
	} satisfies Meta<CalendarColumnsDesktop>;
</script>

<Template let:args>
	<div class="w-[800px] h-[800px]">
		<CalendarColumnsDesktop {...args} />
	</div>
</Template>

<Story
	args={{
		dates: Array.from({ length: 7 }, (_, i) => addDays(new Date(), i)),
	}}
	name="Primary"
/>
