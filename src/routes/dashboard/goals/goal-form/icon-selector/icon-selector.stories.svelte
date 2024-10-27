<script module lang="ts">
	import IconSelector from './IconSelector.svelte';

	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		component: IconSelector,
		parameters: {
			layout: 'fullscreen',
		},
	});
</script>

<Story args={{ name: 'Fire' }} name="Primary" />
