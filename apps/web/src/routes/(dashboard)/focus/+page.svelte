<script lang="ts">
	import { Button, Modal } from '@life/shared';
	import { Pause, Pencil, Play, Square } from 'lucide-svelte';

	import TimerForm from './timer-form/TimerForm.svelte';

	let minutes = $state<number>(30);
	let seconds = $state<number>(0);

	let isFormOpen = $state<boolean>(false);

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
				endTimer();
			}
		}, 1000);
	}

	function pauseTimer(): void {
		if (interval) {
			clearInterval(interval);
			interval = null;
		}
	}

	function endTimer(): void {
		pauseTimer(); // Stop the timer
		timer = 30 * 60; // Reset the timer
		updateTimeDisplay(); // Clear the display
	}

	// Update display values based on remaining time
	function updateTimeDisplay(): void {
		minutes = Math.floor((timer % 3600) / 60);
		seconds = timer % 60;
	}
</script>

<!-- Main Timer Display -->
<div
	class="mx-auto flex h-full max-w-7xl flex-col items-center justify-start gap-5 p-4 pt-20 sm:px-6 lg:px-8"
>
	<Button color="white" onclick={() => (isFormOpen = true)}>
		<Pencil class="h-5 w-5 text-indigo-600" />
	</Button>

	<div class="text-6xl font-bold text-indigo-600">
		{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
	</div>

	{#if interval === null}
		<Button disabled={minutes === 0 && seconds === 0} onclick={startTimer}>
			<Play class="h-5 w-5 text-white" />
			Start
		</Button>
	{:else}
		<div class="flex gap-5">
			<Button onclick={pauseTimer}>
				<Pause class="h-5 w-5 text-white" />
				Pause
			</Button>
			<Button onclick={endTimer}>
				<Square class="h-5 w-5 text-white" />
				End
			</Button>
		</div>
	{/if}
</div>

<Modal bind:isOpen={isFormOpen}>
	<TimerForm close={() => (isFormOpen = false)} bind:minutes bind:seconds />
</Modal>
