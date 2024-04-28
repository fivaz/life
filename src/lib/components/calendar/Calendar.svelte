<script lang="ts">
	
import { startOfWeek } from 'date-fns';
	
import CalendarBody from './calendar-body/CalendarBody.svelte';
	import CalendarHeader from './calendar-header/CalendarHeader.svelte';

	let weekStart = startOfWeek(new Date());
</script>

<div class="flex h-screen flex-col md:h-[calc(100vh-20px)]">
	<CalendarHeader bind:weekStart on:create />
	<CalendarBody on:create on:edit {weekStart} />
</div>
