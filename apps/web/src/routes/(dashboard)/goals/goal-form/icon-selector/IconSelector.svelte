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
		class="grid grid-cols-10 justify-between gap-1 overflow-y-auto rounded-lg border border-gray-300 p-2"
	>
		{#each filteredIcons as icon (icon.name)}
			<button
				class="
					{value === icon.name ? 'bg-indigo-200 text-indigo-700 dark:bg-indigo-300' : 'dark:text-gray-400'}
					flex cursor-pointer items-center justify-center rounded p-1 text-2xl"
				onclick={() => (value = icon.name)}
				type="button"
			>
				<GoalIcon class="h-6" {icon} />
			</button>
		{/each}
	</div>
</div>
