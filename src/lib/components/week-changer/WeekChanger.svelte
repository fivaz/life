<script lang="ts">
	import { ChevronLeft, ChevronRight } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { addDays, isSameWeek, startOfWeek } from 'date-fns';
	import { CalendarCheck } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';

	export let weekStart: Date;

	export let selectedDate: Date;

	let currentDate = new Date();

	function goToToday() {
		selectedDate = currentDate;
		weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 });
	}

	function goToNextWeek() {
		weekStart = addDays(weekStart, 7);
		selectedDate = isSameWeek(currentDate, weekStart, { weekStartsOn: 1 })
			? currentDate
			: weekStart;
	}

	function goToPreviousWeek() {
		weekStart = addDays(weekStart, -7);
		selectedDate = isSameWeek(currentDate, weekStart, { weekStartsOn: 1 })
			? currentDate
			: weekStart;
	}

	const dispatch = createEventDispatcher();

	$: dispatch('updateWeekStart', weekStart);
</script>

<div class="flex items-center">
	<div class="relative flex items-stretch rounded-md bg-white shadow-sm">
		<button
			class="hmd:h-9 -8 flex w-9 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-0 text-gray-400 hover:bg-gray-50 hover:text-gray-500 focus:relative"
			on:click={goToPreviousWeek}
			type="button"
		>
			<span class="sr-only">Previous week</span>
			<Icon aria-hidden="true" class="h-5 w-5" src={ChevronLeft} />
		</button>

		<button
			class="border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative"
			on:click={goToToday}
			type="button"
		>
			<span class="hidden md:block">Today</span>
			<span class="block md:hidden"><CalendarCheck class="h-5 w-5 text-gray-400" /></span>
		</button>

		<span class="relative -mx-px hidden h-5 w-px bg-gray-300" />

		<button
			class="flex h-8 w-9 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-0 text-gray-400 hover:bg-gray-50 hover:text-gray-500 focus:relative md:h-9"
			on:click={goToNextWeek}
			type="button"
		>
			<span class="sr-only">Next week</span>
			<Icon aria-hidden="true" class="h-5 w-5" src={ChevronRight} />
		</button>
	</div>
</div>
