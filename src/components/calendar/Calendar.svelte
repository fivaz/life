<script lang="ts">
	import { startOfWeek } from 'date-fns';

	import CalendarBody from './calendar-body/CalendarBody.svelte';
	import CalendarHeader from './calendar-header/CalendarHeader.svelte';

	let currentDate = new Date();

	let weekStart = startOfWeek(currentDate);
</script>

<div class="flex h-full flex-col divide-gray-200">
	<CalendarHeader bind:weekStart {currentDate} />
	<CalendarBody {weekStart} {currentDate} />
</div>
