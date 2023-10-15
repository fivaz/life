<script lang="ts">
	import { startOfWeek } from 'date-fns';

	import type { ActionData } from '../../../.svelte-kit/types/src/routes/$types';
	import CalendarBody from './calendar-body/CalendarBody.svelte';
	import CalendarHeader from './calendar-header/CalendarHeader.svelte';

	let currentDate = new Date();

	let weekStart = startOfWeek(currentDate);

	export let form: ActionData | null = null;
</script>

<div class="flex h-full flex-col divide-gray-200">
	<CalendarHeader bind:weekStart {currentDate} {form} />
	<CalendarBody {weekStart} {currentDate} />
</div>
