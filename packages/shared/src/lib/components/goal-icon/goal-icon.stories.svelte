<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import GoalIcon from './GoalIcon.svelte';

	const { Story } = defineMeta({
		component: GoalIcon,
		parameters: {
			layout: 'fullscreen'
		}
	});
</script>

<Story name="Primary" args={{ name: 'Fire' }} />
