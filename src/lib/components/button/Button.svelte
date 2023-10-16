<script lang="ts">
	import { ArrowPath } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import classnames from 'classnames';

	export let isLoading: boolean = false;

	export let type: 'button' | 'submit' | undefined = undefined;

	export let formaction: string | undefined = undefined;

	export let color: 'indigo' | 'red' = 'indigo';

	const colors = {
		red: 'focus-visible:outline-red-600 bg-red-600 hover:bg-red-500',
		indigo: 'focus-visible:outline-indigo-600 bg-indigo-600 hover:bg-indigo-500'
	};
</script>

<button
	class={classnames(
		colors[color],
		'inline-flex justify-center rounded-md  px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
	)}
	{type}
	{formaction}
>
	{#if isLoading}
		<Icon src={ArrowPath} class="animate-spin h-5 w-5 mr-2" />
	{/if}
	<slot />
</button>
