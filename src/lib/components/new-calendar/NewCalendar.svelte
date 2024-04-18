<script lang="ts">
	import type { AnyEvent } from '$lib/task/utils';

	import NewCalendarBody from '$lib/components/new-calendar/new-calendar-body/NewCalendarBody.svelte';
	import NewCalendarHeader from '$lib/components/new-calendar/new-calendar-header/NewCalendarHeader.svelte';
	import { startOfWeek } from 'date-fns';

	let weekStart = startOfWeek(new Date());

	export let events: AnyEvent[];
</script>

<div class="flex h-full flex-col">
	<NewCalendarHeader bind:weekStart />
	<NewCalendarBody {events} {weekStart} />
</div>
