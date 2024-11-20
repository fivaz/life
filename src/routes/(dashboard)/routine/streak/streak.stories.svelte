<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import Streak from './Streak.svelte';

	const { Story } = defineMeta({
		component: Streak,
		parameters: {
			layout: 'fullscreen',
		},
	});
</script>

<Story name="Primary" args={{}} />
