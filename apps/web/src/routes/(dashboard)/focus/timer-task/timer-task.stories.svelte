<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import TimerTask from './TimerTask.svelte';

	const { Story } = defineMeta({
		component: TimerTask,
		parameters: {
			layout: 'fullscreen',
		},
	});
</script>

<Story name="Primary" args={{}} />
