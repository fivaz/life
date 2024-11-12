<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import WeekListSelector from './WeekListSelector.svelte';

	const { Story } = defineMeta({
		component: WeekListSelector,
		parameters: {
			layout: 'fullscreen',
		},
	});
</script>

<Story args={{}} name="Primary" />
