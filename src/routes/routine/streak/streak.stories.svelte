<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import Streak from './Streak.svelte';

	const { Story } = defineMeta({
		component: Streak,
		parameters: {
			layout: 'fullscreen',
		},
	});
</script>

<Story args={{}} name="Primary" />
