<script lang="ts">
	import { Button, Modal } from '@life/shared';
	import { Pause, Pencil, Play, Square } from 'lucide-svelte';

	import ReportTask from '../report/report-task-list/report-task/ReportTask.svelte';
	import Timer from './timer/Timer.svelte';
	import TimerForm from './timer-form/TimerForm.svelte';

	let isFormOpen = $state<boolean>(false);

	const defaultTime = 30 * 60;
	let timer = $state<number>(defaultTime);
	let interval = $state<number | null>(null);

	let status = $state<'stopped' | 'paused' | 'running'>('stopped');

	// Function to start the timer
	function startTimer(): void {
		if (interval) {
			clearInterval(interval);
		}
		status = 'running';
		interval = window.setInterval(() => {
			if (timer > 0) {
				timer -= 1;
			} else {
				endTimer();
			}
		}, 1000);
	}

	function pauseTimer(): void {
		if (interval) {
			status = 'paused';
			clearInterval(interval);
			interval = null;
		}
	}

	function endTimer(): void {
		pauseTimer();
		timer = defaultTime;
		status = 'stopped';
	}
</script>

<div
	class="mx-auto flex h-full max-w-7xl flex-col items-center justify-start gap-5 bg-gray-50 p-4 pt-20 sm:px-6 lg:px-8"
>
	<Button color="white" disabled={status !== 'stopped'} onclick={() => (isFormOpen = true)}>
		<Pencil class="h-5 w-5 text-indigo-600" />
	</Button>

	<Timer value={timer} />

	{#if status === 'stopped'}
		<Button class="w-28" disabled={timer === 0} onclick={startTimer}>
			<Play class="h-5 w-5 text-white" />
			Start
		</Button>
	{/if}

	{#if status === 'running'}
		<div class="flex gap-5">
			<Button class="w-28" onclick={pauseTimer}>
				<Pause class="h-5 w-5 text-white" />
				Pause
			</Button>
			<Button class="w-28" onclick={endTimer}>
				<Square class="h-5 w-5 text-white" />
				End
			</Button>
		</div>
	{/if}

	{#if status === 'paused'}
		<div class="flex gap-5">
			<Button class="w-28" onclick={startTimer}>
				<Play class="h-5 w-5 text-white" />
				Continue
			</Button>
			<Button class="w-28" onclick={endTimer}>
				<Square class="h-5 w-5 text-white" />
				End
			</Button>
		</div>
	{/if}
</div>

<!--<ReportTask task />-->

<Modal bind:isOpen={isFormOpen}>
	<TimerForm close={() => (isFormOpen = false)} bind:time={timer} />
</Modal>
