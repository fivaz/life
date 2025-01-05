<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import Timer from './Timer.svelte';

	const { Story } = defineMeta({
		component: Timer,
		parameters: {
			layout: 'fullscreen',
		},
	});
</script>

<Story name="Primary" args={{}} />
