<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		class?: string;
		children: Snippet;
		level?: 'dark' | 'darker' | 'middle';
		tag?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
	}

	let { class: klass, children, level = 'dark', tag = 'p' }: Props = $props();

	const colorMap = {
		dark: 'text-gray-700 dark:text-gray-100',
		darker: 'text-gray-900 dark:text-white',
		middle: 'text-gray-500 dark:text-gray-400',
	};
</script>

<svelte:element this={tag} class="{klass} {colorMap[level]}">
	{@render children()}
</svelte:element>
