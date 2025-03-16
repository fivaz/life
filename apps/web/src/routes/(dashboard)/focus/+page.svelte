<script lang="ts">
	import { Button, Modal } from '@life/shared';
	import { averageRound15, formatDate } from '@life/shared/date';
	import type { Task } from '@life/shared/task';
	import { sortTasks } from '@life/shared/task';
	import { where } from 'firebase/firestore';
	import { Pause, Pencil, Play, PlayIcon, Square, SquareIcon } from 'lucide-svelte';

	import { fetchTasks } from '$lib/task/task.repository';

	import { endTimer, pauseTimer, startTimer, timer } from './service.svelte';
	import Timer from './timer/Timer.svelte';
	import TimerForm from './timer-form/TimerForm.svelte';
	import TimerTask from './timer-task/TimerTask.svelte';

	let isFormOpen = $state<boolean>(false);

	let tasks = $state<Task[]>([]);

	function filterTasks(tasks: Task[]): Task[] {
		const timedTasks = tasks.filter((task) => task.startTime);
		return sortTasks(timedTasks);
	}

	fetchTasks(
		(unsortedTasks) => (tasks = filterTasks(unsortedTasks)),
		where('date', '==', formatDate(new Date())),
	);

	let currentDate = $state(averageRound15(new Date()));

	$effect(() => {
		const interval = setInterval(() => {
			currentDate = averageRound15(new Date());
		}, 1000);

		return () => clearInterval(interval);
	});
</script>

<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
	<div class="sticky top-0 flex flex-col items-center justify-start gap-5 py-10">
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
				<Button class="w-28 justify-center" onclick={pauseTimer}>
					<PlayIcon class="size-5 text-white" />
					Pause
				</Button>
				<Button class="w-28 justify-center" onclick={endTimer}>
					<SquareIcon class="size-5 text-white" />
					End
				</Button>
			</div>
		{/if}

		{#if timer.status === 'paused'}
			<div class="flex gap-5">
				<Button class="w-28 justify-center" onclick={startTimer}>
					<PlayIcon class="size-5 text-white" />
					Continue
				</Button>
				<Button class="w-28 justify-center" onclick={endTimer}>
					<SquareIcon class="size-5 text-white" />
					End
				</Button>
			</div>
		{/if}
	</div>

	<div class="flex flex-col gap-2">
		{#each tasks as task (task.id)}
			<TimerTask {currentDate} {task} />
		{/each}
	</div>
</div>

<Modal bind:isOpen={isFormOpen}>
	<TimerForm close={() => (isFormOpen = false)} bind:time={timer.value} />
</Modal>
