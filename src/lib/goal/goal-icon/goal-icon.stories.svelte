<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import GoalIcon from './GoalIcon.svelte';

	const { Story } = defineMeta({
		component: GoalIcon,
		parameters: {
			layout: 'fullscreen',
		},
	});
</script>

<Story args={{ name: 'Fire' }} name="Primary" />
