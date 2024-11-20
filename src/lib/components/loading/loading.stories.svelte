<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import Loading from './Loading.svelte';

	const { Story } = defineMeta({
		component: Loading,
		parameters: {
			layout: 'fullscreen',
		},
	});
</script>

<Story name="Primary" args={{}}>
	<div class="h-screen w-full">
		<Loading />
	</div>
</Story>
