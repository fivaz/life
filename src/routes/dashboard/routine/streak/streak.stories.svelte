<script module lang="ts">
	import Streak from './Streak.svelte';

	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		component: Streak,
		parameters: {
			layout: 'fullscreen',
		},
	});
</script>

<Story args={{}} name="Primary" />
