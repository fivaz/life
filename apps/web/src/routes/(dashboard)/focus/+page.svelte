<script lang="ts">
	// Variables with explicit types
	import { Button } from '@life/shared';
	import { Pencil, Play, Save } from 'lucide-svelte';

	let minutes = $state<number>(0);
	let seconds = $state<number>(0);

	let isEditing = $state<boolean>(false);
	let timer = $state<number>(0);
	let interval = $state<number | null>(null);

	// Function to start the timer
	function startTimer(): void {
		if (interval) clearInterval(interval);
		timer = minutes * 60 + seconds;
		interval = window.setInterval(() => {
			if (timer > 0) {
				timer -= 1;
				updateTimeDisplay();
			} else {
				if (interval) clearInterval(interval);
				interval = null;
			}
		}, 1000);
	}

	// Update display values based on remaining time
	function updateTimeDisplay(): void {
		minutes = Math.floor((timer % 3600) / 60);
		seconds = timer % 60;
	}

	// Toggle edit mode
	function toggleEdit(): void {
		isEditing = !isEditing;
	}
</script>

<!-- Main Timer Display -->
<div
	class="mx-auto flex h-full max-w-7xl flex-col items-center justify-start gap-5 p-4 pt-20 sm:px-6 lg:px-8"
>
	<Button color="white" onclick={toggleEdit}>
		{#if isEditing}
			<Save class="h-5 w-5 text-indigo-600" />
		{:else}
			<Pencil class="h-5 w-5 text-indigo-600" />
		{/if}
	</Button>

	{#if isEditing}
		<div class="flex items-center gap-2">
			<input
				class="block w-16 rounded-md border border-gray-300 p-2 text-center shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
				min="0"
				placeholder="Minutes"
				type="number"
				bind:value={minutes}
			/>
			<span class="text-xl">:</span>
			<input
				class="block w-16 rounded-md border border-gray-300 p-2 text-center shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
				min="0"
				placeholder="Seconds"
				type="number"
				bind:value={seconds}
			/>
		</div>
	{:else}
		<div class="text-6xl font-bold text-indigo-600">
			{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
		</div>
	{/if}

	<Button disabled={(minutes === 0 && seconds === 0) || isEditing} onclick={startTimer}>
		<Play class="h-5 w-5" />
		Start
	</Button>
</div>
