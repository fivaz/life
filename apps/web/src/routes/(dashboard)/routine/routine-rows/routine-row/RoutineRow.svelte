<script lang="ts">
	import { IconRender } from '@life/shared';
	import { formatDate } from '@life/shared/date';
	import { startOfWeek } from 'date-fns';
	import { Check, Flame, GripVertical, Settings2Icon, Undo2 } from 'lucide-svelte';
	import { fly } from 'svelte/transition';
	import { dragHandle } from 'svelte-dnd-action';

	import type { Routine } from '$lib/routine/routine.model';
	import { routineDurationMap } from '$lib/routine/routine.model';
	import { toggleRoutineCompletion } from '$lib/routine/routine.repository';
	import { currentUser } from '$lib/user/user.utils.svelte';

	import RoutineFormButton from '../../routine-form-button/RoutineFormButton.svelte';
	import { previousDate, selectedDate, weekChangeDuration } from '../../service.svelte';
	import { isRoutineVisible } from '../../utils';
	import { getStatusColor, getStreak, statusColor } from '../service';

	interface Props {
		routine: Routine;
	}

	let { routine }: Props = $props();

	const selectedDateString = $derived<string>(formatDate(selectedDate.value));

	let status = $derived<keyof typeof statusColor>(getStatusColor(routine, selectedDateString));

	let streak = $derived<number>(getStreak(routine, selectedDateString));

	const slideDuration = $derived(
		startOfWeek(selectedDate.value).getTime() === startOfWeek(previousDate.value).getTime()
			? 200
			: weekChangeDuration,
	);

	const slideDirection = $derived(
		selectedDate.value.getTime() > previousDate.value.getTime() ? 1 : -1,
	);
</script>

{#if isRoutineVisible(routine)}
	<div class="relative h-10">
		{#key selectedDate.value}
			<div
				class="{statusColor[status]}
	absolute flex w-full justify-between gap-2 rounded-lg px-3 py-2 text-sm font-semibold leading-6 text-gray-200"
				in:fly={{ x: 900 * slideDirection, duration: slideDuration }}
				out:fly={{ x: 900 * slideDirection * -1, duration: slideDuration }}
			>
				<div class="flex flex-1 items-center gap-2 truncate">
					<div aria-label="drag-handle for {routine.name}" use:dragHandle>
						<GripVertical class="size-5" />
					</div>
					<IconRender name={routine.icon} class="size-5" />
					<span class="flex-1 truncate text-sm font-semibold">{routine.name}</span>
				</div>

				<div class="flex items-center justify-end gap-2">
					{#if routine.duration}
						{@const Icon = routineDurationMap[routine.duration].icon}
						<Icon class="size-4 shrink-0" />
					{/if}

					<div class="flex items-center gap-1">
						<span>{streak}</span>
						<Flame class="size-4 text-red-500" />
					</div>

					<button
						class="touch-manipulation rounded px-1.5 py-1 shadow-sm ring-1 ring-inset ring-gray-300"
						onclick={() => toggleRoutineCompletion(routine, selectedDateString, currentUser.uid)}
						type="button"
					>
						{#if status === 'completed'}
							<Undo2 class="size-4" />
						{:else}
							<Check class="size-4" />
						{/if}
					</button>

					<RoutineFormButton
						class="rounded shadow-sm ring-1 ring-inset ring-gray-300"
						color="none"
						padding="px-1.5 py-1"
						{routine}
					>
						<Settings2Icon class="size-4" />
					</RoutineFormButton>
				</div>
			</div>
		{/key}
	</div>
{:else}
	<div class={statusColor[status]}></div>
{/if}
