<script lang="ts">
	import type { Routine } from '$lib/routine/utils';

	import { DATE } from '$lib/consts';
	import { format } from 'date-fns';
	import { flip } from 'svelte/animate';
	import { dragHandleZone } from 'svelte-dnd-action';

	import RoutineRow from '../routine-row/RoutineRow.svelte';
	import { updateRoutine } from '../service';

	export let selectedDate: Date;

	export let userId: string;

	export let routines: Routine[];

	$: dateString = format(selectedDate, DATE);

	function updateRoutineLocally({ detail }: { detail: { items: Routine[] } }) {
		routines = detail.items;
	}

	function persistChanges({ detail }: { detail: { items: Routine[] } }) {
		routines = detail.items;
		updateRoutine(userId, routines);
	}
</script>

<ul
	class="flex flex-col gap-1"
	on:consider={updateRoutineLocally}
	on:finalize={persistChanges}
	use:dragHandleZone={{ flipDurationMs: 200, items: routines }}
>
	{#each routines as routine (routine.id)}
		<li animate:flip={{ duration: 200 }}>
			<RoutineRow on:edit {routine} selectedDate={dateString} {userId} />
		</li>
	{/each}
</ul>
