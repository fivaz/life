<script lang="ts">
	import { Button } from '@life/shared';
	import { formatDate } from '@life/shared/date';
	import type { Task } from '@life/shared/task';
	import { clsx } from 'clsx';
	import { addDays, subDays } from 'date-fns';
	import {
		Calendar1,
		CalendarArrowDown,
		CalendarArrowUp,
		CalendarMinus,
		CalendarRange,
		ChartColumnStackedIcon,
		ChartLineIcon,
	} from 'lucide-svelte';

	import Input from '$lib/components/form/input/Input.svelte';
	import Select from '$lib/components/form/select/Select.svelte';
	import SelectItem from '$lib/components/form/select/select-item/SelectItem.svelte';
	import DoubleLineChartIcon from '$lib/components/icons/DoubleLineChartIcon.svelte';
	import { tooltip } from '$lib/components/tooltip/tooltip.action';

	import type { Interval, ReportChartType } from './report-chart/service';
	import { getDatasetDelta, intervals } from './service';

	type Props = {
		chartType: ReportChartType;
		interval: Interval;
		startAt: string;
		endAt: string;
	};

	let {
		chartType = $bindable(),
		interval = $bindable(),
		startAt = $bindable(),
		endAt = $bindable(),
	}: Props = $props();

	let isPeriodCurrentWeek: boolean = $state(true);

	function togglePeriodToCurrentWeek() {
		isPeriodCurrentWeek = !isPeriodCurrentWeek;
		if (isPeriodCurrentWeek) {
			startAt = formatDate(subDays(new Date(), 3));
			endAt = formatDate(addDays(new Date(), 3));
		} else {
			startAt = '';
			endAt = '';
		}
	}
</script>

<div class="flex flex-col items-center justify-between gap-5 md:flex-row">
	<div class="flex items-center gap-5">
		<h2 class="text-base font-semibold leading-5 text-gray-900">
			Tasks by {interval}
		</h2>
		<!--{#if datasetDelta > 0}-->
		<!--	<div class="flex gap-2" use:tooltip={'tasks increased'}>-->
		<!--		<span>{datasetDelta}</span>-->
		<!--		<CalendarArrowUp class="h-5 w-5 text-red-500" />-->
		<!--	</div>-->
		<!--{:else if datasetDelta < 0}-->
		<!--	<div class="flex gap-2" use:tooltip={'tasks decreased'}>-->
		<!--		<span>{datasetDelta}</span>-->
		<!--		<CalendarArrowDown class="h-5 w-5 text-green-500" />-->
		<!--	</div>-->
		<!--{:else}-->
		<!--	<div class="flex gap-2" use:tooltip={'tasks remained equal'}>-->
		<!--		<span>{datasetDelta}</span>-->
		<!--		<CalendarMinus class="h-5 w-5 text-yellow-500" />-->
		<!--	</div>-->
		<!--{/if}-->
	</div>

	<div class="flex flex-col items-center gap-3 md:flex-row">
		<Button class="p-1" color="white" noPadding onclick={() => (chartType = 'stacked')}>
			<ChartColumnStackedIcon
				class={clsx('size-5', { 'text-indigo-600': chartType === 'stacked' })}
			/>
		</Button>

		<Button class="p-1" color="white" noPadding onclick={() => (chartType = 'line')}>
			<ChartLineIcon class={clsx('size-5', { 'text-indigo-600': chartType === 'line' })} />
		</Button>

		<Button class="p-1" color="white" noPadding onclick={() => (chartType = 'double-line')}>
			<DoubleLineChartIcon
				class={clsx('size-5', { 'text-indigo-600': chartType === 'double-line' })}
			/>
		</Button>

		<Button class="p-1" color="white" noPadding onclick={togglePeriodToCurrentWeek}>
			{#if isPeriodCurrentWeek}
				<CalendarRange class="l-5 w-5" />
			{:else}
				<Calendar1 class="l-5 w-5" />
			{/if}
		</Button>

		<Input class="flex items-center gap-2" label="Start at" type="date" bind:value={startAt} />

		<Input class="flex items-center gap-2" label="End at" type="date" bind:value={endAt} />

		<Select
			class="flex w-40 items-center gap-2"
			label="Interval"
			selectClass="grow"
			bind:value={interval}
		>
			{#snippet placeholder()}
				<span class="lowercase">{interval}</span>
			{/snippet}

			{#each intervals as interval (interval)}
				<SelectItem class="lowercase" value={interval}>{interval}</SelectItem>
			{/each}
		</Select>
	</div>
</div>
