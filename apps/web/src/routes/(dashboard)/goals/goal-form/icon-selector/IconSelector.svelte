<script lang="ts">
	import { GoalIcon } from '@life/shared';
	import { icons } from '@life/shared/goal';

	import Input from '$lib/components/form/input/Input.svelte';

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
	<Input
		autocomplete="off"
		inputClass="w-full"
		placeholder="Search icon..."
		bind:value={searchQuery}
	/>
	<div
		class="flex h-40 flex-wrap gap-1 divide-gray-400 overflow-y-auto rounded-lg border border-gray-400 p-2 dark:divide-gray-700 dark:border-gray-700 dark:[color-scheme:dark]"
	>
		{#each filteredIcons as icon (icon.name)}
			<button
				class="
					{value === icon.name ? 'bg-indigo-200 text-indigo-700 dark:bg-indigo-300' : 'dark:text-gray-400'}
					flex size-7 cursor-pointer items-center justify-center rounded p-1"
				onclick={() => (value = icon.name)}
				type="button"
			>
				<GoalIcon class="size-6" {icon} />
			</button>
		{/each}
	</div>
</div>
