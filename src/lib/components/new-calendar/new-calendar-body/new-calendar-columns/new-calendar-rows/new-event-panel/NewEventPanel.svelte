<script lang="ts">
	import type { AnyEvent } from '$lib/task/utils';

	import { tailwindColors } from '$lib/category/utils';
	import { NEW_GRID_CELL_HEIGHT } from '$lib/components/new-calendar/new-calendar-body/new-calendar-columns/new-calendar-rows/new-event-panel/service';
	import { TIME } from '$lib/consts';
	import { getDurationInMinutes } from '$lib/task/utils';
	import { clsx } from 'clsx';
	import { format, parse } from 'date-fns';
	import { createEventDispatcher } from 'svelte';

	export let event: AnyEvent;

	let className = '';
	export { className as class };

	function timeToMinutes(time: string) {
		const [hours, minutes] = time.split(':').map(Number);
		return hours * 60 + minutes;
	}

	function getTop() {
		const startTimeMinutes = timeToMinutes(event.startTime);
		return `${(startTimeMinutes / 15) * NEW_GRID_CELL_HEIGHT}px`;
	}

	function getHeight() {
		const durationMinutes = timeToMinutes(event.duration);

		return `${(durationMinutes / 15) * NEW_GRID_CELL_HEIGHT}px`;
	}

	const dispatch = createEventDispatcher<{ toggle: AnyEvent }>();

	export function isLong(event: AnyEvent) {
		return Math.abs(getDurationInMinutes(event)) > 15;
	}
</script>

<div class={clsx('absolute flex w-full', className)} style="height: {getHeight()}; top: {getTop()}">
	<div
		class={clsx(
			'group absolute inset-1 flex flex-col overflow-y-auto rounded-lg px-2 py-1 text-xs leading-5',
			tailwindColors[event.category.color].text,
			tailwindColors[event.category.color].lightBg,
			tailwindColors[event.category.color].hoverBg,
		)}
	>
		<div class="flex gap-3 justify-between items-center">
			<p class="font-semibold truncate">
				{event.name}
			</p>
			<input
				checked={event.isDone}
				class="rounded border-gray-300 focus:ring-indigo-600"
				on:change={() => dispatch('toggle', event)}
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
