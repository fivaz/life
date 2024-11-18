<script lang="ts">
	import { flip } from 'svelte/animate';
	import { dragHandleZone } from 'svelte-dnd-action';

	import { type Routine, routineTimeMap } from '$lib/routine/routine.model';

	import RoutineRow from '../routine-row/RoutineRow.svelte';

	interface Props {
		time: Routine['time'];
		routines: Routine[];
		title: string;
		updateRoutines: (routines: Routine[]) => void;
	}

	let { time, updateRoutines, routines = $bindable(), title }: Props = $props();

	function handleConsider({ detail }: { detail: { items: Routine[] } }) {
		routines = detail.items;
	}

	function handleFinalize({ detail }: { detail: { items: Routine[] } }) {
		routines = detail.items.map((routine, index) => {
			routine.time = time;
			routine.order = index;
			return routine;
		});

		updateRoutines(routines);
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
		use:dragHandleZone={{ flipDurationMs: flipDurationMs, items: routines }}
	>
		{#each routines as routine (routine)}
			<div animate:flip={{ duration: flipDurationMs }}>
				<RoutineRow {routine} />
			</div>
		{/each}
	</div>
</div>
