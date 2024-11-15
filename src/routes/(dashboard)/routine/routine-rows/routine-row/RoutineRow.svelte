<script lang="ts">
	import { Settings2 } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { format, parse, subDays } from 'date-fns';
	import { Check, GripVertical, Undo2 } from 'lucide-svelte';
	import { Flame } from 'lucide-svelte';
	import { dragHandle } from 'svelte-dnd-action';

	import { DATE } from '$lib/consts';
	import GoalIcon from '$lib/goal/goal-icon/GoalIcon.svelte';
	import type { Routine } from '$lib/routine/routine.model';
	import { toggleRoutineCompletion } from '$lib/routine/routine.repository';

	interface Props {
		routine: Routine;
		selectedDate: string;
		userId: string;
		edit: (routine: Routine) => void;
	}

	let { routine, selectedDate, userId, edit }: Props = $props();

	let status = $derived.by<keyof typeof statusColor>(() => {
		const existingRoutine = routine.completeHistory.find(({ date }) => date === selectedDate);

		if (existingRoutine) {
			return existingRoutine.isCompleted ? 'completed' : 'uncompleted';
		} else {
			return 'none';
		}
	});

	let streak = $derived.by<number>(() => {
		let streakValue = 0;
		let selectedDateObj = parse(selectedDate, DATE, new Date());

		while (true) {
			const dateStr = format(selectedDateObj, DATE);

			if (
				routine.completeHistory.length === 0 ||
				!routine.completeHistory.find((entry) => entry.date === dateStr)?.isCompleted
			) {
				break;
			}

			streakValue++;
			selectedDateObj = subDays(selectedDateObj, 1);
		}

		return streakValue;
	});

	const statusColor = {
		none: 'bg-red-100 text-red-500',
		uncompleted: 'bg-yellow-100 text-yellow-500',
		completed: 'bg-green-100 text-green-500',
	};
</script>

<div
	class="{statusColor[
		status
	]} flex justify-between rounded-lg px-3 py-2 text-sm font-semibold leading-6 text-gray-200"
>
	<div class="flex w-[calc(100%-64px)] items-center gap-2">
		<div aria-label="drag-handle for {routine.name}" use:dragHandle>
			<GripVertical class="h-5 w-5" />
		</div>
		<GoalIcon class="h-5 w-5" name={routine.icon} />
		<span class="w-[calc(100%-48px)] truncate text-sm font-semibold">{routine.name}</span>
	</div>

	<div class="flex w-24 justify-end gap-2">
		<div class="flex items-center gap-1">
			<span>{streak}</span>
			<Flame class="h-4 w-auto text-red-500" />
		</div>

		<button
			class="rounded px-1.5 py-1 shadow-sm ring-1 ring-inset ring-gray-300"
			onclick={() => toggleRoutineCompletion(routine, selectedDate, userId)}
			type="button"
		>
			{#if status === 'completed'}
				<Undo2 class="h-4 w-4" />
			{:else}
				<Check class="h-4 w-4" />
			{/if}
		</button>
		<button
			class="rounded px-1.5 py-1 shadow-sm ring-1 ring-inset ring-gray-300"
			onclick={() => edit(routine)}
			type="button"
		>
			<Icon class="h-4 w-4" src={Settings2} />
		</button>
	</div>
</div>
