<script lang="ts">
	import { LText } from '@life/shared';
	import { ChevronRight } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import type { Snippet } from 'svelte';
	import { slide } from 'svelte/transition';

	interface Props {
		title: string;
		children: Snippet;
	}

	let { title, children }: Props = $props();

	let isOpen = $state<boolean>(false);
</script>

<div class="rounded-lg border border-gray-300 p-2 dark:border-gray-700">
	<button
		class="flex w-full items-center justify-between"
		onclick={() => (isOpen = !isOpen)}
		type="button"
	>
		<LText>{title}</LText>
		<Icon class="size-5 {isOpen ? 'rotate-90 transform' : ''}" src={ChevronRight} />
	</button>
	{#if isOpen}
		<div class="flex flex-col gap-2 pt-2 text-gray-500" transition:slide>
			{@render children()}
		</div>
	{/if}
</div>
