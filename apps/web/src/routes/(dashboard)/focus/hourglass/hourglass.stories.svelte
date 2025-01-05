<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Hourglass from './Hourglass.svelte';

	const { Story } = defineMeta({
		component: Hourglass,
		parameters: {
			layout: 'fullscreen',
		},
	});
</script>

<Story args={{}} name="Primary"/>
