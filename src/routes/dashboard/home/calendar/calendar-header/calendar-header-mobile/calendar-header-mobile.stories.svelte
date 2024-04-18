<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import CalendarHeaderMobile from './CalendarHeaderMobile.svelte';

	export const meta = {
		component: CalendarHeaderMobile,
		parameters: {
			layout: 'centered',
		},
		tags: ['autodocs'],
	} satisfies Meta<CalendarHeaderMobile>;
</script>

<Template let:args>
	<CalendarHeaderMobile {...args}></CalendarHeaderMobile>
</Template>

<Story args={{}} name="Primary" />
