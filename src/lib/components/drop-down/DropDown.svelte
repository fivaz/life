<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import { fade } from 'svelte/transition';

	interface Props {
		children: Snippet;
		class?: string;
		itemClass?: string;
		list: { label: string; onclick: () => void }[];
		position: keyof typeof positionClass;
	}

	const positionClass = {
		['top-right']: '-top-2 left-0 -translate-y-full',
		['top-left']: '-top-2 right-0 -translate-y-full',
		['bottom-right']: 'left-0 translate-y-2',
		['bottom-left']: 'right-0 translate-y-2',
	} as const;

	let { children, class: klass, position, list, itemClass }: Props = $props();

	let isOpen = $state(true);

	function handleClickOutside() {
		if (isOpen) {
			isOpen = false;
		}
	}

	onMount(() => {
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});

	function toggleIsOpen(event: MouseEvent) {
		isOpen = !isOpen;
		event.stopPropagation();
	}
</script>

<div class="relative inline-block text-left">
	<button type="button" class="w-full" onclick={toggleIsOpen}>
		{@render children()}
	</button>

	{#if isOpen}
		<ul
			class="{positionClass[position]}
			absolute {klass} origin-top-right transform divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
			in:fade={{ duration: 100 }}
			out:fade={{ duration: 100 }}
		>
			{#each list as item}
				<li>
					<button
						type="button"
						class="{itemClass} block w-full px-3 py-1 text-left text-sm leading-6 hover:bg-gray-50"
						onclick={item.onclick}
					>
						{item.label}
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</div>
