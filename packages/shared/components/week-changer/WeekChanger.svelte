<script lang="ts">
	import { ChevronLeft, ChevronRight } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { addDays, isSameWeek, parse, startOfWeek } from 'date-fns';
	import { CalendarCheck } from 'lucide-svelte';

	import { DATE,formatDate } from '../../lib/date.utils';

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
	<div class="relative flex items-stretch rounded-md bg-white shadow-sm">
		<button
			class="hmd:h-9 -8 flex w-9 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-0 text-gray-400 hover:bg-gray-50 hover:text-gray-500 focus:relative"
			onclick={goToPreviousWeek}
			type="button"
		>
			<span class="sr-only">Previous week</span>
			<Icon class="h-5 w-5" aria-hidden="true" src={ChevronLeft} />
		</button>

		<!--this input is triggered by the button below-->
		<input
			bind:this={datePicker}
			class="pointer-events-none absolute touch-none opacity-0"
			type="date"
			bind:value={selectedDateString.value}
		/>

		<button
			class="border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative"
			onclick={openDatePicker}
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
			<Icon class="h-5 w-5" aria-hidden="true" src={ChevronRight} />
		</button>
	</div>
</div>
