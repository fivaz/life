<script lang="ts">
	import { LText } from '@life/shared';
	import { differenceInDays, parseISO } from 'date-fns';

	interface Props {
		maxValue: number;
		value: number;

		startDate: string; // "YYYY-MM-DD"
		deadline: string; // "YYYY-MM-DD"

		class?: string;
	}

	let { maxValue, value, startDate, deadline, class: klass = '' }: Props = $props();

	let percentage = $derived(((value / maxValue) * 100).toFixed(0));
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
			class="absolute top-0 h-2.5 w-1 rounded-sm bg-red-500"
		></div>
	</div>
</div>
