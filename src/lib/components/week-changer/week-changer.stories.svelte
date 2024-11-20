<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import WeekChanger from './WeekChanger.svelte';

	const { Story } = defineMeta({
		component: WeekChanger,
		parameters: {
			layout: 'fullscreen',
		},
	});

	import { startOfWeek } from 'date-fns';
</script>

<Story name="Primary" args={{ weekStart: startOfWeek(new Date()), selectedDate: new Date() }} />
