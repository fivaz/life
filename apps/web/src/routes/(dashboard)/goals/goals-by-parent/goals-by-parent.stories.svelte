<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import GoalsByParent from './GoalsByParent.svelte';

	const { Story } = defineMeta({
		component: GoalsByParent,
		parameters: {
			layout: 'fullscreen',
		},
	});
</script>

<Story args={{}} name="Primary"/>
