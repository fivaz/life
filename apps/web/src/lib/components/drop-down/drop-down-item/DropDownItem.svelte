<script lang="ts">
	import type { Placement } from '@floating-ui/dom';
	import { Copy } from 'lucide-svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		class?: string;
		onclick?: () => void;
		href?: string;
	}

	let { children, class: klass, onclick, href }: Props = $props();

	let baseClass =
		'focus-visible:outline-white-600 min-w-full rounded-md inline-flex items-center justify-start gap-2 p-2 text-sm text-gray-900 shadow-sm hover:bg-gray-200 hover:text-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 dark:text-gray-100 dark:hover:bg-gray-800';
</script>

<li>
	{#if onclick}
		<button class="{baseClass} {klass}" {onclick} type="button">
			{@render children()}
		</button>
	{:else if href}
		<a class="{baseClass} {klass}" {href}>
			{@render children()}
		</a>
	{:else}
		{@render children()}
	{/if}
</li>
