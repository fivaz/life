<script lang="ts">
	import { Icon } from '@lucide/svelte';

	import { icons } from '$lib/components/icon/icon-selector/service.js';
	import LInput from '$lib/components/LInput.svelte';

	interface Props {
		name: string;
		value: null | string;
	}

	let { name, value = $bindable() }: Props = $props();

	let searchQuery = $state('');

	let filteredIcons = $derived(
		icons.filter(({ name }) => name.toLowerCase().includes(searchQuery.toLowerCase())),
	);
</script>

<div class="relative flex flex-col gap-2">
	<input hidden value={name} />
	<LInput
		autocomplete="off"
		inputClass="w-full"
		placeholder="Search icon..."
		bind:value={searchQuery}
	/>
	<div
		class="flex h-40 flex-wrap justify-between gap-1 overflow-y-auto rounded-lg border border-gray-300 p-2 dark:border-gray-700 dark:[color-scheme:dark]"
	>
		{#each filteredIcons as icon (icon.name)}
			<button
				class="
						{value === icon.name ? 'bg-indigo-200 text-indigo-700 dark:bg-indigo-300' : 'dark:text-gray-400'}
						flex size-7 cursor-pointer items-center justify-center rounded p-1"
				onclick={() => (value = icon.name)}
				type="button"
			>
				{#if 'component' in icon}
					{@const IconComponent = icon.component}
					<IconComponent />
				{:else}
					<Icon iconNode={icon.iconNode} />
				{/if}
			</button>
		{/each}
	</div>
</div>
