<script lang="ts">
	import { clsx } from 'clsx';
	import RotateCw from 'lucide-svelte/icons/rotate-cw';
	import type { Snippet } from 'svelte';

	interface Props {
		isLoading?: boolean;
		color?: 'indigo' | 'red' | 'white';
		type?: 'button' | 'submit' | undefined;
		disabled?: boolean;
		class?: string;
		children: Snippet;
		onclick?: ((e: MouseEvent) => void) | ((e: MouseEvent) => Promise<void>); //onclick is optional because it can be a submit form button
		noPadding?: boolean;
	}

	let {
		isLoading = false,
		color = 'indigo',
		type = undefined,
		disabled = isLoading,
		class: klass,
		children,
		onclick,
		noPadding = false,
	}: Props = $props();

	let child = $state<HTMLElement | null>(null);

	let slotText = $derived(child?.innerText || '');

	const colors = {
		indigo: 'focus-visible:outline-indigo-600 bg-indigo-600 hover:bg-indigo-500 text-white',
		red: 'focus-visible:outline-red-600 bg-red-600 hover:bg-red-500 text-white',
		white: 'focus-visible:outline-white-600 bg-white-600 hover:bg-white-500 border text-gray-900',
	} as const;
</script>

<button
	class={clsx(
		'inline-flex justify-center gap-2 rounded-md text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
		klass,
		colors[color],
		{ 'opacity-70': disabled, 'px-3 py-2': !noPadding },
	)}
	{disabled}
	{onclick}
	{type}
>
	{#if isLoading}
		<RotateCw class="h-5 w-5 animate-spin" />
	{/if}
	<!--hides the content of the button when showing the loading icon, if the content of the button
	 is an icon without any text-->
	<span
		bind:this={child}
		class={clsx('flex items-center gap-2', { hidden: isLoading && !slotText })}
	>
		{@render children()}
	</span>
</button>
