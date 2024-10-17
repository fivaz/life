<script lang="ts">
	import type { Routine } from '$lib/routine/utils';

	import { Settings2 } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Check, Undo2 } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';

	import GoalIcon from '../../goals/goal-form/goal-icon/GoalIcon.svelte';
	import { toggleRoutineCompletion } from '../routine-form/service';

	export let routine: Routine;

	export let selectedDate: string;

	export let userId: string;

	let dispatch = createEventDispatcher<{ edit: Routine; remove: Routine }>();

	$: isDone =
		routine.completeHistory.find(({ date }) => date === selectedDate)?.isCompleted || false;
</script>

<li
	class="flex justify-between rounded-lg px-3 py-2 text-sm font-semibold leading-6 text-gray-200 {isDone
		? 'bg-indigo-600'
		: 'bg-indigo-400'}"
>
	<div class="flex w-[calc(100%-64px)] items-center gap-2">
		<GoalIcon class="h-5 w-5" name={routine.icon} />
		<span class="w-[calc(100%-28px)] truncate text-sm font-semibold">{routine.name}</span>
	</div>

	<div class="flex w-16 justify-end gap-2">
		<button
			class="rounded px-1.5 py-1 shadow-sm ring-1 ring-inset ring-gray-300"
			on:click={() => toggleRoutineCompletion(routine, selectedDate, userId)}
			type="button"
		>
			{#if isDone}
				<Undo2 class="h-4 w-4" />
			{:else}
				<Check class="h-4 w-4" />
			{/if}
		</button>
		<button
			class="rounded px-1.5 py-1 shadow-sm ring-1 ring-inset ring-gray-300"
			on:click={() => dispatch('edit', routine)}
			type="button"
		>
			<Icon class="h-4 w-4" src={Settings2} />
		</button>
	</div>
</li>
