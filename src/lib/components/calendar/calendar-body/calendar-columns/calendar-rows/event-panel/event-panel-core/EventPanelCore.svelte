<script lang="ts">
	import { tailwindColors } from '$lib/category/utils';
	import { GRID_CELL_TIME } from '$lib/components/calendar/calendar-body/calendar-columns/calendar-rows/calendar-grid/service';
	import { editPossibleSingleRecurringEvent } from '$lib/components/task-form/service';
	import { TIME } from '$lib/consts';
	import { type AnyEvent, getDurationInMinutes } from '$lib/task/utils';
	import { clsx } from 'clsx';
	import { format, parse } from 'date-fns';

	export let event: AnyEvent;
	export let userId: string;
	export let targetDate: string;

	let className = '';
	export { className as class };

	export function isLong(event: AnyEvent) {
		return Math.abs(getDurationInMinutes(event)) > GRID_CELL_TIME;
	}

	export function toggleCompletion(userId: string, event: AnyEvent, targetDate: string) {
		editPossibleSingleRecurringEvent({ ...event, isDone: !event.isDone }, userId, targetDate);
	}
</script>

<div class={clsx('flex', className)}>
	<div
		class={clsx(
			'group absolute inset-px flex flex-col overflow-y-auto rounded-lg px-2 py-1 text-xs leading-5',
			tailwindColors[event.category.color].text,
			tailwindColors[event.category.color].lightBg,
			tailwindColors[event.category.color].hoverBg,
		)}
	>
		<div class="flex items-center justify-between gap-3">
			<p class="truncate font-semibold">
				{event.name}
			</p>
			<input
				checked={event.isDone}
				class="rounded border-gray-300 focus:ring-indigo-600"
				on:change={() => toggleCompletion(userId, event, targetDate)}
				type="checkbox"
			/>
		</div>
		{#if isLong(event)}
			<time
				class={tailwindColors[event.category.color].lightText}
				dateTime={`${event.date}T${event.startTime}`}
			>
				{format(parse(event.startTime, TIME, new Date()), 'p')}
			</time>
			<p class="text-pink-500 group-hover:text-pink-700">
				{event.description}
			</p>
		{/if}
	</div>
</div>
