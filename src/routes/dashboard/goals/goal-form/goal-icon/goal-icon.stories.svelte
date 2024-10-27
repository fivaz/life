<script module lang="ts">
	import GoalIcon from './GoalIcon.svelte';

	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		component: GoalIcon,
		parameters: {
			layout: 'fullscreen',
		},
	});
</script>

<Story args={{ name: 'Fire' }} name="Primary" />
