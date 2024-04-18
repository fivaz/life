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

<div
	class={clsx(
		'absolute',
		tailwindColors[event.category.color].text,
		tailwindColors[event.category.color].lightBg,
		tailwindColors[event.category.color].hoverBg,
	)}
	style="height: {getHeight()}; top: {getTop()}"
>
	{event.name}
</div>
