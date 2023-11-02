<script lang="ts" context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import { addDays } from 'date-fns';
	import CalendarColumnsMobile from './CalendarColumnsMobile.svelte';

	export const meta = {
		component: CalendarColumnsMobile,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
		},
		argTypes: {},
	} satisfies Meta<CalendarColumnsMobile>;
</script>

<Template let:args>
	<div class="w-[800px] h-[800px]">
		<CalendarColumnsMobile {...args} />
	</div>
</Template>

<Story
	name="Primary"
	args={{
		dates: Array.from({ length: 7 }, (_, i) => addDays(new Date(), i)),
	}}
/>
