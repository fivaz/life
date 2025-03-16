<script lang="ts">
	import type { Snippet } from 'svelte';

	import { textColors } from '$lib/colors.js';

	interface Props {
		class?: string;
		children: Snippet;
	}

	let { class: klass, children }: Props = $props();
</script>

<span class="{klass} {textColors.dark}">
	{@render children()}
</span>
