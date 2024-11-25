<script lang="ts">
	import { Settings2 } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { startOfWeek } from 'date-fns';
	import { Check, Flame, GripVertical, Undo2 } from 'lucide-svelte';
	import { fly } from 'svelte/transition';
	import { dragHandle } from 'svelte-dnd-action';

	import { previousDate, selectedDate } from '$lib/components/calendar/service.svelte';
	import type { yyyyMMdd } from '$lib/date.utils.svelte';
	import { formatDate } from '$lib/date.utils.svelte';
	import GoalIcon from '$lib/goal/goal-icon/GoalIcon.svelte';
	import type { Routine } from '$lib/routine/routine.model';
	import { toggleRoutineCompletion } from '$lib/routine/routine.repository';
	import { currentUser } from '$lib/user/user.utils.svelte';

	import { weekChangeDuration } from '../../service.svelte.js';
	import { getOpenRoutineForm, getStatusColor, getStreak, statusColor } from '../service';

	interface Props {
		routine: Routine;
	}

	let { routine }: Props = $props();

	const selectedDateString = $derived<yyyyMMdd>(formatDate(selectedDate.value));

	let status = $derived<keyof typeof statusColor>(getStatusColor(routine, selectedDateString));

	let streak = $derived<number>(getStreak(routine, selectedDateString));

	const openRoutineForm = getOpenRoutineForm();

	const slideDuration = $derived(
		startOfWeek(selectedDate.value).getTime() === startOfWeek(previousDate.value).getTime()
			? 200
			: weekChangeDuration,
	);

	const slideDirection = $derived(
		selectedDate.value.getTime() > previousDate.value.getTime() ? 1 : -1,
	);
</script>

<div class="relative h-10">
	{#key selectedDate.value}
		<div
			class="{statusColor[status]}
	absolute flex w-full justify-between rounded-lg px-3 py-2 text-sm font-semibold leading-6 text-gray-200"
			in:fly={{ x: 900 * slideDirection, duration: slideDuration }}
			out:fly={{ x: 900 * slideDirection * -1, duration: slideDuration }}
		>
			<div class="flex flex-1 items-center gap-2 truncate">
				<div aria-label="drag-handle for {routine.name}" use:dragHandle>
					<GripVertical class="h-5 w-auto" />
				</div>
				<GoalIcon name={routine.icon} class="h-5 w-auto" />
				<span class="flex-1 truncate text-sm font-semibold">{routine.name}</span>
			</div>

			<div class="flex w-28 justify-end gap-2">
				<div class="flex items-center gap-1">
					<span>{streak}</span>
					<Flame class="h-4 w-auto text-red-500" />
				</div>

				<button
					class="rounded px-1.5 py-1 shadow-sm ring-1 ring-inset ring-gray-300"
					onclick={() => toggleRoutineCompletion(routine, selectedDateString, currentUser.uid)}
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
					onclick={() => openRoutineForm(routine)}
					type="button"
				>
					<Icon class="h-4 w-4" src={Settings2} />
				</button>
			</div>
		</div>
	{/key}
</div>
