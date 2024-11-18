<script lang="ts">
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';

	import { type Routine, routineTimeMap } from '$lib/routine/routine.model';

	import RoutineRow from '../routine-row/RoutineRow.svelte';

	interface Props {
		time: Routine['time'];
		routines: Routine[];
		title: string;
		special?: boolean;
	}

	let { time, routines, title, special }: Props = $props();

	function filterRoutes(routines: Routine[]): Routine[] {
		return routines.filter((routine) => {
			if (special) {
				return routine.time === undefined;
			}
			return routine.time === time;
		});
	}

	let timedRoutines = $state(filterRoutes(routines));

	function handleSort({ detail }: { detail: { items: Routine[] } }) {
		console.log(detail.items);
		timedRoutines = detail.items;
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
		onconsider={handleSort}
		onfinalize={handleSort}
		use:dndzone={{ flipDurationMs: flipDurationMs, items: timedRoutines }}
	>
		{#each timedRoutines as routine (routine)}
			<div animate:flip={{ duration: flipDurationMs }}>
				<RoutineRow {routine} />
			</div>
		{/each}
	</div>
</div>
