<script lang="ts">
	import { addDays, format, startOfWeek } from 'date-fns';
	import { createEventDispatcher } from 'svelte';

	import CalendarHeaderDesktop from './calendar-header-desktop/CalendarHeaderDesktop.svelte';
	import CalendarHeaderMobile from './calendar-header-mobile/CalendarHeaderMobile.svelte';

	export let weekStart: Date;

	let currentDate = new Date();

	const dispatch = createEventDispatcher();

	function goToToday() {
		weekStart = startOfWeek(currentDate);
	}

	function goToNextWeek() {
		weekStart = addDays(weekStart, 7);
	}

	function goToPreviousWeek() {
		weekStart = addDays(weekStart, -7);
	}

	$: createEvent = () => dispatch('create');

	$: dateStart = format(weekStart, 'yyyy-MM');

	// const viewControls = [{ text: 'Year view' }, { text: 'Week view' }, { text: 'Month view' }];
</script>

<header class="border-b border-gray-200 px-6 py-4">
	<div class="hidden md:block">
		<CalendarHeaderDesktop
			{createEvent}
			{dateStart}
			{goToNextWeek}
			{goToPreviousWeek}
			{goToToday}
		/>
	</div>
	<div class="block md:hidden">
		<CalendarHeaderMobile {createEvent} {dateStart} {goToNextWeek} {goToPreviousWeek} {goToToday} />
	</div>
</header>
