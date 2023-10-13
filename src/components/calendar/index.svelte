<script lang="ts">
	import CalendarHeader from './calendar-header/index.svelte';
	import CalendarGrid from './calendar-grid/index.svelte';
	import { addDays, format, startOfWeek } from 'date-fns';

	let currentDate = new Date();

	let weekStart = startOfWeek(currentDate);
</script>

<div class="flex h-full flex-col">
	<CalendarHeader bind:weekStart {currentDate} />
	<CalendarGrid {weekStart} {currentDate} />
</div>
