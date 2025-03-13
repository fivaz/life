<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		class?: string;
		children: Snippet;
	}

	let { class: klass, children }: Props = $props();
</script>

<span class="{klass} text-gray-700 dark:text-gray-100">
	{@render children()}
</span>
