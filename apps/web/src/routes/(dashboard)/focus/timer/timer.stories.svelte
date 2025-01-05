<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Timer from './Timer.svelte';

	const { Story } = defineMeta({
		component: Timer,
		parameters: {
			layout: 'fullscreen',
		},
	});
</script>

<Story args={{}} name="Primary"/>
