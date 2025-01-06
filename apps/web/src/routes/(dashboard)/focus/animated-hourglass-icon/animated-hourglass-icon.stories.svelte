<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import TimerIcon from './TimerIcon.svelte';

	const { Story } = defineMeta({
		component: TimerIcon,
		parameters: {
			layout: 'fullscreen',
		},
	});
</script>

<Story args={{}} name="Primary"/>
