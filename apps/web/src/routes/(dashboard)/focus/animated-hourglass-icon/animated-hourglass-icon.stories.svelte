<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import AnimatedHourglassIcon from './AnimatedHourglassIcon.svelte';

	const { Story } = defineMeta({
		component: AnimatedHourglassIcon,
		parameters: {
			layout: 'fullscreen',
		},
	});
</script>

<Story name="Primary" args={{}} />
