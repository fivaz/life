<script lang="ts">
	import { clsx } from 'clsx';
	import RotateCw from 'lucide-svelte/icons/rotate-cw';
	import type { Snippet } from 'svelte';

	interface Props {
		isLoading?: boolean;
		color?: 'indigo' | 'red' | 'white' | 'none' | 'dark' | 'light';
		type?: 'button' | 'submit' | undefined;
		disabled?: boolean;
		class?: string;
		children: Snippet;
		onclick?: ((e: MouseEvent) => void) | ((e: MouseEvent) => Promise<void>); //onclick is optional because it can be a submit form button
		padding?: string;
	}

	let {
		isLoading = false,
		color = 'indigo',
		type = undefined,
		disabled = isLoading,
		class: klass,
		children,
		padding,
		onclick,
	}: Props = $props();

	const colors = {
		indigo: 'focus-visible:outline-indigo-600 bg-indigo-600 hover:bg-indigo-500 text-white',
		red: 'focus-visible:outline-red-600 bg-red-600 hover:bg-red-500 text-white',
		white:
			'focus-visible:outline-white-600 hover:bg-gray-200 dark:hover:bg-gray-800 border dark:border-gray-700 text-gray-900 dark:text-gray-100',
		dark: 'border border-darker text-dark hover-dark',
		light: 'border border-light text-light hover-light',
		none: '',
	} as const;
</script>

<button
	class={clsx(
		'flex items-center gap-2 rounded-md text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
		klass,
		colors[color],
		padding || 'px-3 py-2',
		{ 'opacity-70': disabled },
	)}
	{disabled}
	{onclick}
	{type}
>
	{#if isLoading}
		<RotateCw class="h-5 w-5 animate-spin" />
	{/if}
	{@render children()}
</button>
