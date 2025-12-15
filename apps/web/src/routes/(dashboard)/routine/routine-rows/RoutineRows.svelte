<script lang="ts">
	import { LText } from '@life/shared';
	import { ClipboardCopy } from 'lucide-svelte';
	import { flip } from 'svelte/animate';
	import { dragHandleZone } from 'svelte-dnd-action';

	import type { Routine } from '$lib/routine/routine.model';
	import { routineTimeMap } from '$lib/routine/routine.model';
	import { updateRoutines } from '$lib/routine/routine.repository';
	import { currentUser } from '$lib/user/user.utils.svelte';

	import { routinesMap, selectedDate } from '../service.svelte';
	import { getAvailableRoutines } from '../utils';
	import RoutineRow from './routine-row/RoutineRow.svelte';

	interface Props {
		time: Routine['time'];
		title: string;
	}

	let { time, title }: Props = $props();

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

	let RoutineTimeIcon = $derived(routineTimeMap[time].icon);

	const flipDuration = 200;
</script>

<div class="flex flex-col gap-3">
	<div class="flex items-center gap-2">
		<RoutineTimeIcon class="size-12" />
		<LText class="text-base/7 font-medium">{title}</LText>
	</div>

	<div
		class="dark: flex flex-col gap-1 rounded-md border border-gray-300 p-2 dark:border-gray-500"
		onconsider={handleConsider}
		onfinalize={handleFinalize}
		use:dragHandleZone={{ flipDurationMs: flipDuration, items: routinesMap.value[time] }}
	>
		{#each getAvailableRoutines(routinesMap.value[time], selectedDate.value) as routine (routine.id)}
			<div animate:flip={{ duration: flipDuration }}>
				<RoutineRow {routine} />
			</div>
		{/each}
		<div
			class="relative flex h-10 items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 p-1 text-indigo-600 select-none hover:border-gray-400 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
		>
			<ClipboardCopy class="size-5" /> drop a task here
		</div>
	</div>
</div>
