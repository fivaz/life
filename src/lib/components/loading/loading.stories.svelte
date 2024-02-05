<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import Loading from './Loading.svelte';

	export const meta = {
		component: Loading,
		parameters: {
			layout: 'centered',
		},
		tags: ['autodocs'],
	} satisfies Meta<Loading>;
</script>

<script>
</script>

<Template let:args>
	<div class="w-96 h-96 bg-red-200 rounded-full">
		<Loading {...args} class="w-8 h-8" />
	</div>
</Template>

<Story args={{ loading: true }} name="Primary" />
