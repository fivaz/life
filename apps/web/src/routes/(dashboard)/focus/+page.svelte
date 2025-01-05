<script lang="ts">
	import { Button, Modal } from '@life/shared';
	import { formatDate } from '@life/shared/date';
	import type { Task } from '@life/shared/task';
	import { sortTasks } from '@life/shared/task';
	import { where } from 'firebase/firestore';
	import { Pause, Pencil, Play, Square } from 'lucide-svelte';

	import { fetchTasks } from '$lib/task/task.repository';

	import Timer from './timer/Timer.svelte';
	import TimerForm from './timer-form/TimerForm.svelte';
	import TimerTask from './timer-task/TimerTask.svelte';

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

	let tasks = $state<Task[]>([]);

	function filterTasks(tasks: Task[]): Task[] {
		const timedTasks = tasks.filter((task) => task.startTime);
		return sortTasks(timedTasks);
	}

	fetchTasks(
		(unsortedTasks) => (tasks = filterTasks(unsortedTasks)),
		where('date', '==', formatDate(new Date())),
	);
</script>

<div class="mx-auto h-full max-w-7xl overflow-y-auto bg-gray-50 px-4 sm:px-6 lg:px-8">
	<div class="sticky top-0 flex flex-col items-center justify-start gap-5 bg-gray-50 py-10">
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

	<div class="flex flex-col gap-2">
		{#each tasks as task (task.id)}
			<TimerTask {task} />
		{/each}
	</div>
</div>

<Modal bind:isOpen={isFormOpen}>
	<TimerForm close={() => (isFormOpen = false)} bind:time={timer} />
</Modal>
