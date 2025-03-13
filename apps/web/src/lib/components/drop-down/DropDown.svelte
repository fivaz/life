<script lang="ts">
	import { Copy } from 'lucide-svelte';
	import type { Snippet } from 'svelte';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	// TODO use floating lib to make this instead of pure CSS
	interface Props {
		children: Snippet;
		class?: string;
		itemClass?: string;
		list: { label: string; onclick: () => void; icon?: typeof Copy }[];
		position: keyof typeof positionClass;
	}

	const positionClass = {
		['top-right']: '-top-2 left-0 -translate-y-full',
		['top-left']: '-top-2 right-0 -translate-y-full',
		['bottom-right']: '-bottom-2 left-0 translate-y-full',
		['bottom-left']: '-bottom-2 right-0 translate-y-full',
	} as const;

	let { children, class: klass, position, list, itemClass }: Props = $props();

	let isOpen = $state(false);

	let button = $state<HTMLButtonElement | null>(null);

	function handleClickOutside(event: MouseEvent) {
		if (!button) return;

		if (!(event.target instanceof HTMLElement)) return;

		if (button.contains(event.target)) return;

		if (event.target === button) return;

		if (!isOpen) return;

		isOpen = false;
	}

	onMount(() => {
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});

	function toggleIsOpen() {
		isOpen = !isOpen;
	}
</script>

<div class="relative flex text-left">
	<button bind:this={button} class="w-full" onclick={toggleIsOpen} type="button">
		{@render children()}
	</button>

	{#if isOpen}
		<ul
			class="{positionClass[position]} {klass}
			absolute origin-top-right transform divide-y divide-gray-700 rounded-md bg-gray-300 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:divide-gray-800 dark:bg-gray-900"
			in:fade={{ duration: 100 }}
			out:fade={{ duration: 100 }}
		>
			{#each list as item}
				<li>
					<button
						class="{itemClass} focus-visible:outline-white-600 inline-flex w-full items-center justify-start gap-2 p-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 dark:text-gray-100 dark:hover:bg-gray-800"
						onclick={item.onclick}
					>
						{#if item.icon}
							<item.icon class="size-4" />
						{/if}
						{item.label}
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</div>
