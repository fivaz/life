<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import IconSelector from './IconSelector.svelte';

	const { Story } = defineMeta({
		component: IconSelector,
		parameters: {
			layout: 'fullscreen',
		},
	});
</script>

<Story name="Primary" args={{ name: 'Fire' }} />
