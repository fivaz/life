<script lang="ts">
	import RotateCw from 'lucide-svelte/icons/rotate-cw';
	import type { Snippet } from 'svelte';

	// TODO add preflight to this button

	interface Props {
		isLoading?: boolean;
		color?: 'indigo' | 'red' | 'white' | 'none';
		type?: 'button' | 'submit' | undefined;
		disabled?: boolean;
		class?: string;
		children: Snippet;
		onclick?: ((e: MouseEvent) => void) | ((e: MouseEvent) => Promise<void>); //onclick is optional because it can be a submit form button
	}

	let {
		isLoading = false,
		color = 'indigo',
		type = undefined,
		disabled = isLoading,
		class: klass,
		children,
		onclick,
	}: Props = $props();

	let child = $state<HTMLElement | null>(null);

	let slotText = $derived(child?.innerText || '');

	let isChildVisible = $derived(!(isLoading && !slotText));
</script>

<button
	class="{klass}
	{color === 'indigo'
		? 'inline-flex justify-center gap-2 rounded-md border bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
		: ''}
	{color === 'red'
		? 'inline-flex justify-center gap-2 rounded-md border bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600'
		: ''}
	{color === 'white'
		? 'inline-flex justify-center gap-2 rounded-md border bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
		: ''}
	"
	class:opacity-70={disabled}
	{disabled}
	{onclick}
	{type}
>
	{#if isLoading}
		<RotateCw class="h-5 w-5 animate-spin" />
	{/if}
	<!--hides the content of the button when showing the loading icon, if the content of the button
	 is an icon without any text-->
	{#if isChildVisible}
		<span bind:this={child} class="flex items-center gap-2">
			{@render children()}
		</span>
	{/if}
</button>

<style>
</style>
