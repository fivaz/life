<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		class?: string;
		children: Snippet;
		level?: 'dark' | 'darker' | 'middle';
	}

	let { class: klass, children, level = 'dark' }: Props = $props();

	const colorMap = {
		dark: 'text-dark',
		darker: 'text-darker',
		middle: 'text-middle',
	};
</script>

<span class="{klass} {colorMap[level]}">
	{@render children()}
</span>
