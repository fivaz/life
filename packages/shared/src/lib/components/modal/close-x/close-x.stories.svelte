<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import CloseX from './CloseX.svelte';

	const { Story } = defineMeta({
		component: CloseX,
		parameters: {
			layout: 'fullscreen',
		},
	});
</script>

<Story name="Primary" args={{}} />
