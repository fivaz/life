<script lang="ts">
	import { format } from 'date-fns';
	import { flip } from 'svelte/animate';
	import { dragHandleZone } from 'svelte-dnd-action';

	import { DATE } from '$lib/consts';
	import type { Routine } from '$lib/routine/utils';

	import { updateRoutines } from '../service';
	import RoutineRow from './routine-row/RoutineRow.svelte';

	interface Props {
		selectedDate: Date;
		userId: string;
		routines: Routine[];
		edit: (routine: Routine) => void;
	}

	let { selectedDate, userId, edit, routines = $bindable() }: Props = $props();

	let dateString = $derived(format(selectedDate, DATE));

	function updateRoutineLocally({ detail }: { detail: { items: Routine[] } }) {
		routines = detail.items;
	}

	function persistChanges({ detail }: { detail: { items: Routine[] } }) {
		routines = detail.items;
		updateRoutines(userId, routines);
	}
</script>

<ul
	class="flex flex-col gap-1"
	onconsider={updateRoutineLocally}
	onfinalize={persistChanges}
	use:dragHandleZone={{ flipDurationMs: 200, items: routines }}
>
	{#each routines as routine (routine.id)}
		<li animate:flip={{ duration: 200 }}>
			<RoutineRow {edit} {routine} selectedDate={dateString} {userId} />
		</li>
	{/each}
</ul>
