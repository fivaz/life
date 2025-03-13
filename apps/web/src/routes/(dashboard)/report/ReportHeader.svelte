<script lang="ts">
	import { Button, LText } from '@life/shared';
	import { formatDate } from '@life/shared/date';
	import { clsx } from 'clsx';
	import { addDays, subDays } from 'date-fns';
	import {
		Calendar1,
		CalendarArrowDownIcon,
		CalendarArrowUpIcon,
		CalendarMinusIcon,
		CalendarRange,
		ChartColumnStackedIcon,
		ChartLineIcon,
	} from 'lucide-svelte';

	import Input from '$lib/components/form/input/Input.svelte';
	import Select from '$lib/components/form/select/Select.svelte';
	import SelectItem from '$lib/components/form/select/select-item/SelectItem.svelte';
	import DoubleLineChartIcon from '$lib/components/icons/DoubleLineChartIcon.svelte';
	import { tooltip } from '$lib/components/tooltip/tooltip.action';

	import { getLineChartDataset } from './report-chart/line-helper';
	import { prepareData } from './report-chart/service';
	import { reportStore } from './runes.svelte';
	import { intervals } from './service';

	let isPeriodCurrentWeek: boolean = $state(true);

	function togglePeriodToCurrentWeek() {
		isPeriodCurrentWeek = !isPeriodCurrentWeek;
		if (isPeriodCurrentWeek) {
			reportStore.periodStartAt = formatDate(subDays(new Date(), 3));
			reportStore.periodEndAt = formatDate(addDays(new Date(), 3));
		} else {
			reportStore.periodStartAt = '';
			reportStore.periodEndAt = '';
		}
	}

	function getTaskDelta() {
		const { sortedTasks, startDate, endDate } = prepareData(
			reportStore.tasks,
			reportStore.periodStartAt,
			reportStore.periodEndAt,
		);

		const { uncompletedTasks } = getLineChartDataset(
			sortedTasks,
			reportStore.selectedInterval,
			startDate,
			endDate,
		);

		const uncompletedAtStart = uncompletedTasks[0];
		const uncompletedAtEnd = uncompletedTasks[uncompletedTasks.length - 1];

		return uncompletedAtEnd - uncompletedAtStart;
	}

	const tasksDelta = $derived(getTaskDelta());
</script>

<div class="flex flex-col items-center justify-between gap-5 md:flex-row">
	<div class="flex items-center gap-5">
		<LText class="text-base font-semibold leading-5 ">
			Tasks by {reportStore.selectedInterval}
		</LText>
		{#if tasksDelta > 0}
			<div class="flex gap-2" use:tooltip={'tasks increased'}>
				<LText>{tasksDelta}</LText>
				<CalendarArrowUpIcon class="h-5 w-5 text-red-500" />
			</div>
		{:else if tasksDelta < 0}
			<div class="flex gap-2" use:tooltip={'tasks decreased'}>
				<LText>{tasksDelta}</LText>
				<CalendarArrowDownIcon class="h-5 w-5 text-green-500" />
			</div>
		{:else}
			<div class="flex gap-2" use:tooltip={'tasks remained equal'}>
				<LText>{tasksDelta}</LText>
				<CalendarMinusIcon class="h-5 w-5 text-yellow-500" />
			</div>
		{/if}
	</div>

	<div class="flex flex-col items-center gap-3 md:flex-row">
		<div class="flex items-center gap-3">
			<Button color="white" onclick={() => (reportStore.chartType = 'stacked')} padding="p-1">
				<ChartColumnStackedIcon
					class={clsx('size-5', { 'text-indigo-600': reportStore.chartType === 'stacked' })}
				/>
			</Button>

			<Button color="white" onclick={() => (reportStore.chartType = 'line')} padding="p-1">
				<ChartLineIcon
					class={clsx('size-5', { 'text-indigo-600': reportStore.chartType === 'line' })}
				/>
			</Button>

			<Button color="white" onclick={() => (reportStore.chartType = 'double-line')} padding="p-1">
				<DoubleLineChartIcon
					class={clsx('size-5', { 'text-indigo-600': reportStore.chartType === 'double-line' })}
				/>
			</Button>

			<Button color="white" onclick={togglePeriodToCurrentWeek} padding="p-1">
				{#if isPeriodCurrentWeek}
					<CalendarRange class="l-5 w-5" />
				{:else}
					<Calendar1 class="l-5 w-5" />
				{/if}
			</Button>
		</div>

		<Input
			class="flex items-center gap-2"
			label="Start at"
			type="date"
			bind:value={reportStore.periodStartAt}
		/>

		<Input
			class="flex items-center gap-2"
			label="End at"
			type="date"
			bind:value={reportStore.periodEndAt}
		/>

		<Select
			class="flex w-40 items-center gap-2"
			label="Interval"
			selectClass="grow"
			bind:value={reportStore.selectedInterval}
		>
			{#snippet placeholder()}
				<span class="lowercase">{reportStore.selectedInterval}</span>
			{/snippet}

			{#each intervals as interval (interval)}
				<SelectItem class="lowercase" value={interval}>{interval}</SelectItem>
			{/each}
		</Select>
	</div>
</div>
