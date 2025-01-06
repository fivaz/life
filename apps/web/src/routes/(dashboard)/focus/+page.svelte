<script lang="ts">
	import { Button, currentDate, Modal } from '@life/shared';
	import { formatDate, formatTime } from '@life/shared/date';
	import type { Task } from '@life/shared/task';
	import { sortTasks } from '@life/shared/task';
	import { where } from 'firebase/firestore';
	import { Pause, Pencil, Play, Square } from 'lucide-svelte';

	import { fetchTasks } from '$lib/task/task.repository';

	import { defaultTime, timer } from './service.svelte';
	import Timer from './timer/Timer.svelte';
	import TimerForm from './timer-form/TimerForm.svelte';
	import TimerTask from './timer-task/TimerTask.svelte';

	let isFormOpen = $state<boolean>(false);

	// Function to start the timer.value
	function startTimer(): void {
		if (timer.interval) {
			clearInterval(timer.interval);
		}
		timer.status = 'running';
		timer.interval = setInterval(() => {
			if (timer.value > 0) {
				timer.value -= 1;
			} else {
				endTimer();
			}
		}, 1000);
	}

	function pauseTimer(): void {
		if (timer.interval) {
			timer.status = 'paused';
			clearInterval(timer.interval);
			timer.interval = null;
		}
	}

	function endTimer(): void {
		pauseTimer();
		timer.status = 'stopped';
		timer.value = defaultTime;
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

{formatTime(currentDate.value)}
<div class="mx-auto h-full max-w-7xl overflow-y-auto bg-gray-50 px-4 sm:px-6 lg:px-8">
	<div class="sticky top-0 flex flex-col items-center justify-start gap-5 bg-gray-50 py-10">
		<Button color="white" disabled={timer.status !== 'stopped'} onclick={() => (isFormOpen = true)}>
			<Pencil class="h-5 w-5 text-indigo-600" />
		</Button>

		<Timer class="text-6xl font-bold text-indigo-600" />

		{#if timer.status === 'stopped'}
			<Button class="w-28" disabled={timer.value === 0} onclick={startTimer}>
				<Play class="h-5 w-5 text-white" />
				Start
			</Button>
		{/if}

		{#if timer.status === 'running'}
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

		{#if timer.status === 'paused'}
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
	<TimerForm close={() => (isFormOpen = false)} bind:time={timer.value} />
</Modal>
