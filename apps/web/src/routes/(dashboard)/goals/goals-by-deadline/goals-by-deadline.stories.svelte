<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import GoalsByDeadline from './GoalsByDeadline.svelte';

	const { Story } = defineMeta({
		component: GoalsByDeadline,
		parameters: {
			layout: 'fullscreen',
		},
	});
</script>

<Story name="Primary" args={{}} />
