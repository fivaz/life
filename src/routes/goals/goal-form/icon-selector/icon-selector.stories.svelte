<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import IconSelector from './IconSelector.svelte';

	const { Story } = defineMeta({
		component: IconSelector,
		parameters: {
			layout: 'fullscreen',
		},
	});
</script>

<Story args={{ name: 'Fire' }} name="Primary" />
