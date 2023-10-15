<script lang="ts">
	import { ArrowPath } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import classnames from 'classnames';

	export let isLoading: boolean = false;
	export let type: 'button' | 'submit' = 'button';
	export let className: string;
</script>

<button
	class={classnames(
		className,
		'inline-flex justify-center rounded-md  px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
	)}
	{type}
>
	{#if isLoading}
		<Icon src={ArrowPath} class="animate-spin h-5 w-5 mr-2" />
	{/if}
	<slot />
</button>
