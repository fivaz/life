<script module lang="ts">
	import WeekChanger from './WeekChanger.svelte';

	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		component: WeekChanger,
		parameters: {
			layout: 'fullscreen',
		},
	});

	import { startOfWeek } from 'date-fns';
</script>

<Story args={{ weekStart: startOfWeek(new Date()), selectedDate: new Date() }} name="Primary" />
