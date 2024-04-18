<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import CalendarHeaderDesktop from './CalendarHeaderDesktop.svelte';

	export const meta = {
		component: CalendarHeaderDesktop,
		parameters: {
			layout: 'centered',
		},
		tags: ['autodocs'],
	} satisfies Meta<CalendarHeaderDesktop>;
</script>

<Template let:args>
	<CalendarHeaderDesktop {...args}></CalendarHeaderDesktop>
</Template>

<Story args={{}} name="Primary" />
