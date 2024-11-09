<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { startOfWeek } from 'date-fns';

	import CalendarHeader from './CalendarHeader.svelte';

	const { Story } = defineMeta({
		component: CalendarHeader,
		parameters: {
			layout: 'fullscreen',
		},
	});
</script>

<Story args={{ weekStart: startOfWeek(new Date(), { weekStartsOn: 1 }) }} name="Primary" />
