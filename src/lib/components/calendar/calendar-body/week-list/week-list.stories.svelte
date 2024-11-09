<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { addDays } from 'date-fns';

	import WeekList from './WeekList.svelte';

	const { Story } = defineMeta({
		component: WeekList,
	});
</script>

<Story
	args={{
		dates: Array.from({ length: 7 }, (_, i) => addDays(new Date(), i)),
		selectedDate: new Date(),
	}}
	name="Primary"
/>
