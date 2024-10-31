<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import { fade } from 'svelte/transition';
	import { Copy } from 'lucide-svelte';

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

		if (event.target.contains(button)) return;

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
	<button bind:this={button} type="button" class="w-full" onclick={toggleIsOpen}>
		{@render children()}
	</button>

	{#if isOpen}
		<ul
			class="{positionClass[position]} {klass}
			absolute origin-top-right transform divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
			in:fade={{ duration: 100 }}
			out:fade={{ duration: 100 }}
		>
			{#each list as item}
				<li>
					<button
						type="button"
						class="{itemClass} flex w-full items-center gap-2 px-3 py-1 text-left text-sm leading-6 hover:bg-gray-50"
						onclick={item.onclick}
					>
						{#if item.icon}
							<item.icon class="h-4 w-auto" />
						{/if}
						{item.label}
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</div>
