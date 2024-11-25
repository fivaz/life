<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import DayTaskItem from './DayTaskItem.svelte';

	const { Story } = defineMeta({
		component: DayTaskItem,
		parameters: {
			layout: 'fullscreen',
		},
	});
</script>

<Story name="Primary" args={{}} />
