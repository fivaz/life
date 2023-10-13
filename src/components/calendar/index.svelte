<script lang="ts">
	import { startOfWeek } from 'date-fns';

	import CalendarGrid from './calendar-grid/index.svelte';
	import CalendarHeader from './calendar-header/index.svelte';

	let currentDate = new Date();

	let weekStart = startOfWeek(currentDate);
</script>

<div class="flex h-full flex-col">
	<CalendarHeader bind:weekStart {currentDate} />
	<CalendarGrid {weekStart} {currentDate} />
</div>
