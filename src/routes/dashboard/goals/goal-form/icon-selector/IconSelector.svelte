<script lang="ts">
	import Input from '$lib/components/form/input2/Input.svelte';
	import { clsx } from 'clsx';

	import GoalIcon from '../goal-icon/GoalIcon.svelte';
	import { icons } from '../goal-icon/service';

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
	<Input autocomplete="off" bind:value={searchQuery} placeholder="Search icon..." />
	<div
		class="grid grid-cols-10 justify-between gap-1 overflow-y-auto rounded-lg border border-gray-300 p-2"
	>
		{#each filteredIcons as icon (icon.name)}
			<button
				class="
					{value === icon.name ? 'bg-indigo-200 text-indigo-700' : ''}
					flex cursor-pointer items-center justify-center rounded p-1 text-2xl"
				onclick={() => (value = icon.name)}
				type="button"
			>
				<GoalIcon class="h-6" {icon} />
			</button>
		{/each}
	</div>
</div>
