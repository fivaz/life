<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import StaticHourglassIcon from './StaticHourglassIcon.svelte';

	const { Story } = defineMeta({
		component: StaticHourglassIcon,
		parameters: {
			layout: 'fullscreen',
		},
	});
</script>

<Story name="Primary" args={{}} />
