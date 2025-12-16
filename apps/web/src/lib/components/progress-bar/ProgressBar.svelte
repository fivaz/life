<script lang="ts">
	import { LText } from '@life/shared';
	import type { Task } from '@life/shared/task';

	import { calculateActual, calculateExpected } from '$lib/components/progress-bar/service';

	interface Props {
		startDate: string;
		deadline: string;
		class?: string;
		tasks: Task[];
	}

	let { tasks, startDate, deadline, class: klass = '' }: Props = $props();

	let actualPercentage = $derived(calculateActual(tasks));
	let expectedPercentage = $derived(calculateExpected(startDate, deadline));
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
