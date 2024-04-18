<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import CalendarBodyMobile from './CalendarBodyMobile.svelte';

	export const meta = {
		component: CalendarBodyMobile,
		parameters: {
			layout: 'centered',
		},
		tags: ['autodocs'],
	} satisfies Meta<CalendarBodyMobile>;
</script>

<Template let:args>
	<div class="h-96">
		<CalendarBodyMobile {...args}></CalendarBodyMobile>
	</div>
</Template>

<Story args={{}} name="Primary" />
