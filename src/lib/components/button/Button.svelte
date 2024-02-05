<script lang="ts">
	import { ArrowPath } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import classnames from 'classnames';

	export let isLoading: boolean = false;

	export let type: 'button' | 'submit' | undefined = undefined;

	export let formaction: string | undefined = undefined;

	export let color: 'indigo' | 'red' = 'indigo';

	const colors = {
		indigo: 'focus-visible:outline-indigo-600 bg-indigo-600 hover:bg-indigo-500',
		red: 'focus-visible:outline-red-600 bg-red-600 hover:bg-red-500',
	};

	let className = '';
	export { className as class };

	let slot: HTMLElement | null = null;

	$: slotText = slot?.innerText || '';
</script>

<button
	class={classnames(
		colors[color],
		'inline-flex gap-2 justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
		className,
	)}
	{formaction}
	on:click
	{type}
	{...$$restProps}
>
	{#if isLoading}
		<Icon class="animate-spin h-5 w-5" src={ArrowPath} />
	{/if}
	<!--hides the content of the button when showing the loading icon, if the content of the button
	 is an icon without any text-->
	<span bind:this={slot} class={classnames({ hidden: isLoading && !slotText })}>
		<slot />
	</span>
</button>
