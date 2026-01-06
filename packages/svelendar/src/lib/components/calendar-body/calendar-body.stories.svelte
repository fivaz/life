<script lang="ts" module>
	import { tasks } from '@life/shared/task';
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import CalendarBody from './CalendarBody.svelte';

	const { Story } = defineMeta({
		component: CalendarBody,
		parameters: {
			layout: 'fullscreen',
		},
	});
</script>

<Story
	name="Primary"
	args={{
		tasks,
	}}
/>
