<script lang="ts">
	import type { AnyEvent } from '$lib/task/utils';

	import { tailwindColors } from '$lib/category/utils';
	import { clsx } from 'clsx';

	import { GRID_CELL_HEIGHT } from '../../../../../../../routes/dashboard/home/calendar/calendar-body/calendar-columns/calendar-rows/calendar-grid/service';

	export let event: AnyEvent;

	function timeToMinutes(time: string) {
		const [hours, minutes] = time.split(':').map(Number);
		return hours * 60 + minutes;
	}

	function getTop() {
		const startTimeMinutes = timeToMinutes(event.startTime);
		return `${(startTimeMinutes / 15) * GRID_CELL_HEIGHT}px`;
	}

	function getHeight() {
		const durationMinutes = timeToMinutes(event.duration);

		return `${(durationMinutes / 15) * GRID_CELL_HEIGHT}px`;
	}
</script>

<div class="absolute flex w-full" style="height: {getHeight()}; top: {getTop()}">
	<div
		class={clsx(
			'group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-blue-50 p-2 text-xs leading-5',
			tailwindColors[event.category.color].text,
			tailwindColors[event.category.color].lightBg,
			tailwindColors[event.category.color].hoverBg,
		)}
	>
		<p class="order-1 font-semibold">
			{event.name}
		</p>
		<p class={tailwindColors[event.category.color].lightText}>
			<time dateTime="2022-01-12T06:00">{event.startTime}</time>
		</p>
	</div>
</div>
