<script lang="ts">
	import { ClipboardCopy } from 'lucide-svelte';
	import { flip } from 'svelte/animate';
	import { dragHandleZone } from 'svelte-dnd-action';

	import { type Routine, routineTimeMap } from '$lib/routine/routine.model';
	import { updateRoutines } from '$lib/routine/routine.repository';
	import type { yyyyMMdd } from '$lib/task/task.model';
	import { currentUser } from '$lib/user/user.utils.svelte.js';

	import { routinesMap } from '../service.svelte.js';
	import RoutineRow from './routine-row/RoutineRow.svelte';

	interface Props {
		time: Routine['time'];
		title: string;
		selectedDate: yyyyMMdd;
	}

	let { time, selectedDate, title }: Props = $props();

	function handleConsider({ detail }: { detail: { items: Routine[] } }) {
		routinesMap.value[time] = detail.items;
	}

	function handleFinalize({ detail }: { detail: { items: Routine[] } }) {
		routinesMap.value[time] = detail.items.map((routine, index) => {
			routine.time = time;
			routine.order = index;
			return routine;
		});

		updateRoutines(currentUser.uid, routinesMap.value[time]);
	}

	let Icon = routineTimeMap[time].icon;

	const flipDurationMs = 200;
</script>

<div class="flex flex-col gap-3">
	<div class="flex items-center gap-2">
		<Icon class="h-12 w-12" />
		<span class="text-base/7 font-medium text-slate-900"> {title} </span>
	</div>

	<div
		class="flex flex-col gap-1 rounded-md border p-2"
		onconsider={handleConsider}
		onfinalize={handleFinalize}
		use:dragHandleZone={{ flipDurationMs: flipDurationMs, items: routinesMap.value[time] }}
	>
		{#each routinesMap.value[time] as routine (routine.id)}
			<div animate:flip={{ duration: flipDurationMs }}>
				<RoutineRow {routine} {selectedDate} />
			</div>
		{/each}
		<div
			class="relative flex h-10 select-none items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 p-1 text-indigo-600 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
		>
			<ClipboardCopy class="h-5 w-5" /> drop a task here
		</div>
	</div>
</div>
