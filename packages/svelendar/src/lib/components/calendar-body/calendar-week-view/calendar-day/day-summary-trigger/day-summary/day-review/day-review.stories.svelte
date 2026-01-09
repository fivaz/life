<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import DayReview from './DayReview.svelte';

	const { Story } = defineMeta({
		component: DayReview,
	});

	import { tasks } from '@life/shared/task';
</script>

<Story
	name="Primary"
	args={{
		tasks: tasks,
	}}
/>
