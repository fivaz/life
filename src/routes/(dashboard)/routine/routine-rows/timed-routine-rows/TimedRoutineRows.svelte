<script lang="ts">
	import { flip } from 'svelte/animate';
	import { dragHandleZone } from 'svelte-dnd-action';

	import { type Routine, routineTimeMap } from '$lib/routine/routine.model';

	import { routinesMap } from '../../service.svelte';
	import RoutineRow from '../routine-row/RoutineRow.svelte';

	interface Props {
		time: Routine['time'];
		title: string;
		updateRoutines: (routines: Routine[]) => void;
	}

	let { time, updateRoutines, title }: Props = $props();

	function handleConsider({ detail }: { detail: { items: Routine[] } }) {
		routinesMap.value[time] = detail.items;
	}

	function handleFinalize({ detail }: { detail: { items: Routine[] } }) {
		routinesMap.value[time] = detail.items.map((routine, index) => {
			routine.time = time;
			routine.order = index;
			return routine;
		});

		updateRoutines(routinesMap.value[time]);
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
		{#each routinesMap.value[time] as routine (routine)}
			<div animate:flip={{ duration: flipDurationMs }}>
				<RoutineRow {routine} />
			</div>
		{/each}
	</div>
</div>
