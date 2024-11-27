<script lang="ts">
	import RotateCw from 'lucide-svelte/icons/rotate-cw';
	import type { Snippet } from 'svelte';

	// TODO add preflight to this button

	interface Props {
		isLoading?: boolean;
		color?: keyof typeof colors;
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
		onclick
	}: Props = $props();

	const colors = {
		indigo: 'focus-visible:outline-indigo-600 bg-indigo-600 hover:bg-indigo-500',
		none: '',
		red: 'focus-visible:outline-red-600 bg-red-600 hover:bg-red-500'
	} as const;

	let child = $state<HTMLElement | null>(null);

	let slotText = $derived(child?.innerText || '');

	let isChildVisible = $derived(!(isLoading && !slotText));
</script>

<button
	class="{klass} {colors[color]}
	{color === 'indigo'
		? 'focus-visible:outline-indigo-600 bg-indigo-600 hover:bg-indigo-500 inline-flex justify-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
		: ''}
	{color === 'red'
		? 'focus-visible:outline-red-600 bg-red-600 hover:bg-red-500 inline-flex justify-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
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
