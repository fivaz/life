<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import HorizontalTime from './HorizontalTime.svelte';

	const { Story } = defineMeta({
		component: HorizontalTime,
	});
</script>

<Story name="Primary" args={{}}>
	<HorizontalTime><div></div></HorizontalTime>
</Story>
