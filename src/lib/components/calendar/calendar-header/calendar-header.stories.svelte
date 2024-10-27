<script module lang="ts">
	import CalendarHeader from './CalendarHeader.svelte';

	import { startOfWeek } from 'date-fns';
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		component: CalendarHeader,
		parameters: {
			layout: 'fullscreen',
		},
	});
</script>

<Story args={{ weekStart: startOfWeek(new Date(), { weekStartsOn: 1 }) }} name="Primary" />
