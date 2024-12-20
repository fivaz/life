<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import GoalsByParent from './GoalsByParent.svelte';

	const { Story } = defineMeta({
		component: GoalsByParent,
		parameters: {
			layout: 'fullscreen',
		},
	});
</script>

<Story name="Primary" args={{}} />
