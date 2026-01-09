<script lang="ts" module>
	import { tasks } from '@life/shared/task';
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import DaySummary from './DaySummary.svelte';

	const { Story } = defineMeta({
		component: DaySummary,
	});
</script>

<Story name="Primary" args={{ tasks, close: () => console.log('close'), date: new Date() }} />
