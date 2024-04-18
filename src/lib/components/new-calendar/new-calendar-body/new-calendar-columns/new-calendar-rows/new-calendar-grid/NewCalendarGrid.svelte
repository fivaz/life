<script lang="ts">
	import { GRID_CELL_HEIGHT } from '../../../../../../../routes/dashboard/home/calendar/calendar-body/calendar-columns/calendar-rows/calendar-grid/service';
	import { halfHourInterval } from '../../../../../../../routes/dashboard/home/calendar/calendar-body/calendar-columns/calendar-rows/service';
</script>

<div
	class="h-full grid divide-y"
	style="grid-template-rows: repeat({24 * 2}, {GRID_CELL_HEIGHT}px)"
></div>
