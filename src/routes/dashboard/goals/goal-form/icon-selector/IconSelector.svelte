<script lang="ts">
	import Input from '$lib/components/form/input/Input.svelte';
	import { clsx } from 'clsx';

	import GoalIcon from '../goal-icon/GoalIcon.svelte';
	import { icons } from '../goal-icon/service';

	export let name: string;

	export let value: null | string;

	let filteredIcons = icons;

	let searchQuery = '';

	$: filteredIcons = icons.filter(({ name }) =>
		name.toLowerCase().includes(searchQuery.toLowerCase()),
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
				class={clsx(
					{ 'bg-indigo-200 text-indigo-700': value === icon.name },
					'flex cursor-pointer items-center justify-center rounded p-1 text-2xl',
				)}
				on:click={() => (value = icon.name)}
				type="button"
			>
				<GoalIcon class="h-6" {icon} />
			</button>
		{/each}
	</div>
</div>
