<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import DayTaskItem from './DayTaskItem.svelte';

	const { Story } = defineMeta({
		component: DayTaskItem,
	});

	import { formatDate } from '@life/shared/date';
	import { longRecurring } from '@life/shared/task';
</script>

<Story
	name="Primary"
	args={{
		task: longRecurring,
		date: new Date(),
		index: 1,
	}}
/>
