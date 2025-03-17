<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		class?: string;
		children: Snippet;
		level?: 'dark' | 'darker' | 'middle';
	}

	let { class: klass, children, level = 'dark' }: Props = $props();

	const colorMap = {
		dark: 'text-gray-700 dark:text-gray-100',
		darker: 'text-gray-900 dark:text-white',
		middle: 'text-gray-500 dark:text-gray-400',
	};
</script>

<span class="{klass} {colorMap[level]}">
	{@render children()}
</span>
