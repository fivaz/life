<script lang="ts">
	import { addDays, isSameWeek, parse, startOfWeek } from 'date-fns';
	import CalendarCheck from 'lucide-svelte/icons/calendar-check';
	import ChevronLeftIcon from 'lucide-svelte/icons/chevron-left';
	import ChevronRightIcon from 'lucide-svelte/icons/chevron-right';

	import { DATE, formatDate } from '$lib/date.js';

	interface Props {
		selectedDate: Date;
		onchange?: (weekStart: Date) => void;
	}

	let { onchange, selectedDate = $bindable() }: Props = $props();

	const currentDate = new Date();

	let datePicker = $state<HTMLInputElement | null>(null);

	const selectedDateString = {
		get value() {
			return formatDate(selectedDate);
		},
		set value(value: string) {
			selectedDate = parse(value, DATE, new Date());
			onchange?.(selectedDate);
		},
	};

	function openDatePicker() {
		datePicker?.showPicker();
	}

	function goToNextWeek() {
		let weekStart = startOfWeek(selectedDate);
		weekStart = addDays(weekStart, 7);
		selectedDate = isSameWeek(currentDate, weekStart) ? currentDate : weekStart;
		onchange?.(selectedDate);
	}

	function goToPreviousWeek() {
		let weekStart = startOfWeek(selectedDate);
		weekStart = addDays(weekStart, -7);
		selectedDate = isSameWeek(currentDate, weekStart) ? currentDate : weekStart;
		onchange?.(selectedDate);
	}
</script>

<div class="flex items-center">
	<div class="relative flex items-stretch rounded-md shadow-sm">
		<button
			class="hmd:h-9 -8 flex w-9 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-0 text-gray-400 hover:bg-gray-200 hover:text-gray-500 focus:relative dark:border-gray-700 dark:hover:bg-gray-800"
			onclick={goToPreviousWeek}
			type="button"
		>
			<ChevronLeftIcon class="size-6" />
		</button>

		<!--this input is triggered by the button below-->
		<input
			bind:this={datePicker}
			class="pointer-events-none absolute touch-none opacity-0 dark:[color-scheme:dark]"
			type="date"
			bind:value={selectedDateString.value}
		/>

		<button
			class="border-y border-gray-300 px-3.5 text-sm font-semibold hover:bg-gray-200 focus:relative dark:border-gray-700 dark:hover:bg-gray-800"
			onclick={openDatePicker}
		>
			<CalendarCheck class="size-5 text-gray-400" />
		</button>

		<button
			class="flex h-8 w-9 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-0 text-gray-400 hover:bg-gray-200 hover:text-gray-500 focus:relative md:h-9 dark:border-gray-700 dark:hover:bg-gray-800"
			onclick={goToNextWeek}
			type="button"
		>
			<ChevronRightIcon class="size-6" />
		</button>
	</div>
</div>
