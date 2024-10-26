<script lang="ts">
	import { ArrowPath } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { clsx } from 'clsx';
	import type { Snippet } from 'svelte';

	interface Props {
		isLoading?: boolean;
		color?: keyof typeof colors;
		type?: 'button' | 'submit' | undefined;
		disabled?: boolean;
		class?: string;
		children?: Snippet;
		onclick?: ((e: MouseEvent) => void) | ((e: MouseEvent) => Promise<void>); //onclick is optional because it can be a submit form button
	}

	let {
		isLoading = false,
		color = 'indigo',
		type = undefined,
		disabled = isLoading,
		class: className = '',
		children,
		onclick,
	}: Props = $props();

	const colors = {
		indigo: 'focus-visible:outline-indigo-600 bg-indigo-600 hover:bg-indigo-500',
		none: '',
		red: 'focus-visible:outline-red-600 bg-red-600 hover:bg-red-500',
	} as const;

	let child = $state<HTMLElement | null>(null);

	let slotText = $derived(child?.innerText || '');
</script>

<button
	class={clsx(
		colors[color],
		{
			'inline-flex justify-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2':
				color !== 'none',
			'opacity-70': disabled,
		},
		className,
	)}
	{disabled}
	{onclick}
	{type}
>
	{#if isLoading}
		<Icon class="h-5 w-5 animate-spin" src={ArrowPath} />
	{/if}
	<!--hides the content of the button when showing the loading icon, if the content of the button
	 is an icon without any text-->
	<span
		bind:this={child}
		class={clsx('flex items-center gap-2', { hidden: isLoading && !slotText })}
	>
		{@render children?.()}
	</span>
</button>
