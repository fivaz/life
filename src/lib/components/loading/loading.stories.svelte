<script lang="ts" context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import Loading from './Loading.svelte';

	export const meta = {
		component: Loading,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
		},
	} satisfies Meta<Loading>;
</script>

<script>
</script>

<Template let:args>
	<div class="w-96 h-96 bg-red-200 rounded-full">
		<Loading {...args} class="w-8 h-8" />
	</div>
</Template>

<Story name="Primary" args={{ loading: true }} />
