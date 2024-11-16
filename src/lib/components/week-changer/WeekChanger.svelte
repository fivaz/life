<script lang="ts">
	import { ChevronLeft, ChevronRight } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { addDays, format, isSameWeek, parse } from 'date-fns';
	import { CalendarCheck } from 'lucide-svelte';

	import { DATE } from '$lib/consts';

	interface Props {
		weekStart: Date;
		selectedDate: Date;
		hasDatesIncreased?: boolean;
	}

	let {
		weekStart = $bindable(),
		selectedDate = $bindable(),
		hasDatesIncreased = $bindable(),
	}: Props = $props();

	const currentDate = new Date();

	let datePicker2 = $state<HTMLInputElement | null>(null);

	let dateString = $state<string>(format(selectedDate, DATE));

	function updateDate(e: Event & { currentTarget: HTMLInputElement }): void {
		selectedDate = parse(e.currentTarget.value, DATE, new Date());
	}

	function openDatePicker() {
		datePicker2?.showPicker();
	}

	function goToNextWeek() {
		hasDatesIncreased = true;
		weekStart = addDays(weekStart, 7);
		selectedDate = isSameWeek(currentDate, weekStart, { weekStartsOn: 1 })
			? currentDate
			: weekStart;
	}

	function goToPreviousWeek() {
		hasDatesIncreased = false;
		weekStart = addDays(weekStart, -7);
		selectedDate = isSameWeek(currentDate, weekStart, { weekStartsOn: 1 })
			? currentDate
			: weekStart;
	}
</script>

<div class="flex items-center">
	<div class="relative flex items-stretch rounded-md bg-white shadow-sm">
		<button
			class="hmd:h-9 -8 flex w-9 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-0 text-gray-400 hover:bg-gray-50 hover:text-gray-500 focus:relative"
			onclick={goToPreviousWeek}
			type="button"
		>
			<span class="sr-only">Previous week</span>
			<Icon aria-hidden="true" class="h-5 w-5" src={ChevronLeft} />
		</button>

		<input
			bind:this={datePicker2}
			type="date"
			class="pointer-events-none absolute opacity-0"
			oninput={updateDate}
			value={dateString}
		/>

		<button
			onclick={openDatePicker}
			class="border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative"
		>
			<CalendarCheck class="h-5 w-5 text-gray-400" />
		</button>

		<span class="relative -mx-px hidden h-5 w-px bg-gray-300"></span>

		<button
			class="flex h-8 w-9 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-0 text-gray-400 hover:bg-gray-50 hover:text-gray-500 focus:relative md:h-9"
			onclick={goToNextWeek}
			type="button"
		>
			<span class="sr-only">Next week</span>
			<Icon aria-hidden="true" class="h-5 w-5" src={ChevronRight} />
		</button>
	</div>
</div>
