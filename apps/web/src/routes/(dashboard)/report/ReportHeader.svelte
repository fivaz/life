<script lang="ts">
	import { Button } from '@life/shared';
	import { formatDate } from '@life/shared/date';
	import { clsx } from 'clsx';
	import { addDays, subDays } from 'date-fns';
	import {
		Calendar1,
		CalendarArrowDown,
		CalendarArrowDownIcon,
		CalendarArrowUp,
		CalendarArrowUpIcon,
		CalendarMinus,
		CalendarMinusIcon,
		CalendarRange,
		ChartColumnStackedIcon,
		ChartLineIcon,
	} from 'lucide-svelte';
	import { tooltip } from '$lib/components/tooltip/tooltip.action';
	import Input from '$lib/components/form/input/Input.svelte';
	import Select from '$lib/components/form/select/Select.svelte';
	import SelectItem from '$lib/components/form/select/select-item/SelectItem.svelte';
	import DoubleLineChartIcon from '$lib/components/icons/DoubleLineChartIcon.svelte';
	import { intervals } from './service';
	import { reportStore, getTasksByPeriod } from './runes.svelte';
	import { getLineChartConfig, getLineChartDataset } from './report-chart/line-helper';
	import { type Interval, prepareData } from './report-chart/service';
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
		<h2 class="text-base font-semibold leading-5 text-gray-900">
			Tasks by {reportStore.selectedInterval}
		</h2>
		{#if tasksDelta > 0}
			<div class="flex gap-2" use:tooltip={'tasks increased'}>
				<span>{tasksDelta}</span>
				<CalendarArrowUpIcon class="h-5 w-5 text-red-500" />
			</div>
		{:else if tasksDelta < 0}
			<div class="flex gap-2" use:tooltip={'tasks decreased'}>
				<span>{tasksDelta}</span>
				<CalendarArrowDownIcon class="h-5 w-5 text-green-500" />
			</div>
		{:else}
			<div class="flex gap-2" use:tooltip={'tasks remained equal'}>
				<span>{tasksDelta}</span>
				<CalendarMinusIcon class="h-5 w-5 text-yellow-500" />
			</div>
		{/if}
	</div>

	<div class="flex flex-col items-center gap-3 md:flex-row">
		<div class="flex items-center gap-3">
			<Button
				class="p-1"
				color="white"
				noPadding
				onclick={() => (reportStore.chartType = 'stacked')}
			>
				<ChartColumnStackedIcon
					class={clsx('size-5', { 'text-indigo-600': reportStore.chartType === 'stacked' })}
				/>
			</Button>

			<Button class="p-1" color="white" noPadding onclick={() => (reportStore.chartType = 'line')}>
				<ChartLineIcon
					class={clsx('size-5', { 'text-indigo-600': reportStore.chartType === 'line' })}
				/>
			</Button>

			<Button
				class="p-1"
				color="white"
				noPadding
				onclick={() => (reportStore.chartType = 'double-line')}
			>
				<DoubleLineChartIcon
					class={clsx('size-5', { 'text-indigo-600': reportStore.chartType === 'double-line' })}
				/>
			</Button>

			<Button class="p-1" color="white" noPadding onclick={togglePeriodToCurrentWeek}>
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
