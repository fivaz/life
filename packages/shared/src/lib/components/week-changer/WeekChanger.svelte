<script lang="ts">
	import { addDays, isSameWeek, parse, startOfWeek } from 'date-fns';
	import CalendarCheck from 'lucide-svelte/icons/calendar-check';
	import ChevronLeftIcon from 'lucide-svelte/icons/chevron-left';
	import ChevronRightIcon from 'lucide-svelte/icons/chevron-right';

	import { borderColors, hoverColors } from '$lib/colors.js';
	import { DATE, formatDate } from '$lib/date.js';

	interface Props {
		selectedDate: Date;
		onchange?: (weekStart: Date) => void;
		class?: string;
	}

	let { onchange, selectedDate = $bindable(), class: klass }: Props = $props();

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

<div class="relative flex items-center {klass} rounded-md border {borderColors.darker}">
	<button class="px-2 py-1 {hoverColors.darker}" onclick={goToPreviousWeek} type="button">
		<ChevronLeftIcon class="size-6" />
	</button>

	<!--this input is triggered by the button below-->
	<input
		bind:this={datePicker}
		class="pointer-events-none absolute touch-none opacity-0 dark:[color-scheme:dark]"
		type="date"
		bind:value={selectedDateString.value}
	/>

	<button class="px-2 py-1.5 {hoverColors.darker}" onclick={openDatePicker} type="button">
		<CalendarCheck class="size-5" />
	</button>

	<button class="px-2 py-1 {hoverColors.darker}" onclick={goToNextWeek} type="button">
		<ChevronRightIcon class="size-6" />
	</button>
</div>
