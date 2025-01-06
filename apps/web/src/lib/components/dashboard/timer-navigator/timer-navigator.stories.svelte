<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import TimerNavigator from './TimerNavigator.svelte';

	const { Story } = defineMeta({
		component: TimerNavigator,
		parameters: {
			layout: 'fullscreen',
		},
	});
</script>

<Story args={{}} name="Primary"/>
