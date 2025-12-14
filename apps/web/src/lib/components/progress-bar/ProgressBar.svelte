<script lang="ts">
	import { LText } from '@life/shared';
	import { differenceInHours, parseISO, startOfDay } from 'date-fns';

	interface Props {
		maxValue: number;
		value: number;
		startDate: string;
		deadline: string;
		class?: string;
	}

	let { maxValue, value, startDate, deadline, class: klass = '' }: Props = $props();

	let actualPercentage = $derived(getActualPercentage());

	let expectedPercentage = $derived(getExpectedPercentage());

	function getActualPercentage() {
		return ((value / maxValue) * 100).toFixed(0);
	}

	function getExpectedPercentage() {
		const start = startOfDay(parseISO(startDate));
		const end = startOfDay(parseISO(deadline));
		const now = new Date();

		const totalHours = differenceInHours(end, start);
		const passedHours = differenceInHours(now, start);

		if (totalHours <= 0) return 0;

		const raw = (passedHours / totalHours) * 100;
		const clamped = Math.max(0, Math.min(raw, 100));

		return clamped.toFixed(0);
	}
</script>

<div class="flex w-full items-center gap-2">
	<LText class="font-semibold">{actualPercentage}%</LText>

	<div class="{klass} relative h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
		<!-- Actual progress -->
		<div
			style={`width: ${actualPercentage}%`}
			class="h-2.5 rounded-full bg-indigo-600 transition-all duration-300 dark:bg-indigo-500"
		></div>

		<!-- Deadline marker -->
		<div
			style={`left: ${expectedPercentage}%`}
			class="absolute top-0 h-2.5 w-1 rounded-xs bg-red-500"
		></div>
	</div>
</div>
