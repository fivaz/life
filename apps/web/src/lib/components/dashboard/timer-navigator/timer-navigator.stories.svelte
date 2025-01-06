<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import TimerNavigator from './TimerNavigator.svelte';

	const { Story } = defineMeta({
		component: TimerNavigator,
		parameters: {
			layout: 'fullscreen',
		},
	});
</script>

<Story name="Primary" args={{}} />
