<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import WeekListSelector from './WeekListSelector.svelte';

	const { Story } = defineMeta({
		component: WeekListSelector,
		parameters: {
			layout: 'fullscreen',
		},
	});
</script>

<Story name="Primary" args={{}} />
