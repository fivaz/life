<script lang="ts">
	import { LText } from '@life/shared';
	import { differenceInHours, parseISO, startOfDay } from 'date-fns';

	interface Props {
		maxValue: number;
		value: number;

		startDate: string; // "YYYY-MM-DD"
		deadline: string; // "YYYY-MM-DD"

		class?: string;
	}

	let { maxValue, value, startDate, deadline, class: klass = '' }: Props = $props();

	// Actual progress percentage
	let percentage = $derived(((value / maxValue) * 100).toFixed(0));

	// Parse dates and normalize to start of day
	const start = startOfDay(parseISO(startDate));
	const end = startOfDay(parseISO(deadline));
	const now = new Date();

	// Compute the deadline progress in hours
	function getDeadlinePercentage() {
		const totalHours = differenceInHours(end, start);
		const passedHours = differenceInHours(now, start);

		if (totalHours <= 0) return 0;

		const raw = (passedHours / totalHours) * 100;
		// Clamp 0–100
		const clamped = Math.max(0, Math.min(raw, 100));

		return clamped.toFixed(0);
	}

	let deadlinePercentage = $derived(getDeadlinePercentage());
</script>

<div class="flex w-full items-center gap-2">
	<LText class="font-semibold">{percentage}%</LText>

	<div class="{klass} relative h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
		<!-- Actual progress -->
		<div
			style={`width: ${percentage}%`}
			class="h-2.5 rounded-full bg-indigo-600 transition-all duration-300 dark:bg-indigo-500"
		></div>

		<!-- Deadline marker -->
		<div
			style={`left: ${deadlinePercentage}%`}
			class="absolute top-0 h-2.5 w-1 rounded-xs bg-red-500"
		></div>
	</div>
</div>
