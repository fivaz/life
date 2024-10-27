<script module lang="ts">
	import { addDays } from 'date-fns';

	import WeekList from './WeekList.svelte';

	import { defineMeta } from '@storybook/addon-svelte-csf';

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
