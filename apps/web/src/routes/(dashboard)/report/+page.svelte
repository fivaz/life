<script lang="ts">
	import { CATEGORY_WORK } from '@life/shared/category';
	import type { Task } from '@life/shared/task';
	import { where } from 'firebase/firestore';

	import Input from '$lib/components/form/input/Input.svelte';
	import Select from '$lib/components/form/select/Select.svelte';
	import SelectItem from '$lib/components/form/select/select-item/SelectItem.svelte';
	import { fetchTasks } from '$lib/task/task.repository';
	import { title } from '$lib/utils.svelte';

	import LineChart from './line-chart/LineChart.svelte';
	import type { Interval } from './service';
	import { generateGraphData, intervals } from './service';

	title.value = 'Report';

	let tasks = $state<Task[]>([]);

	fetchTasks(tasks, where('category.type', '==', CATEGORY_WORK));

	let selectedInterval: Interval = $state(intervals[0]);

	let periodStartAt = $state('');

	let periodEndAt = $state('');

	let dataset = $derived(generateGraphData(tasks, selectedInterval, periodStartAt, periodEndAt));

	let data = $derived({
		datasets: [
			{
				backgroundColor: '#a78bfa',
				borderColor: '#7c3aed',
				borderWidth: 1,
				data: dataset.data,
				fill: true,
				tension: 0.3,
			},
		],
		labels: dataset.labels,
	});

	let options = $derived({
		elements: {
			point: {
				radius: dataset.data.length > 300 ? 0 : 3,
			},
		},
		plugins: {
			legend: {
				display: false,
			},
		},
	});
</script>

<div class="py-4">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<h1 class="hidden text-2xl font-bold text-gray-900 md:block">{title.value}</h1>

		<div>
			<div class="flex items-center justify-between">
				<h2 class="text-base font-semibold leading-5 text-gray-600">Tasks by {selectedInterval}</h2>

				<div class="flex gap-5">
					<div class="flex items-center gap-2">
						<div class="flex gap-3">
							<Input
								class="flex items-center gap-2"
								label="Start at"
								type="date"
								bind:value={periodStartAt}
							/>

							<Input
								class="flex items-center gap-2"
								label="End at"
								type="date"
								bind:value={periodEndAt}
							/>
						</div>
					</div>

					<Select
						class="flex w-40 items-center gap-2"
						label="Interval"
						selectClass="grow"
						bind:value={selectedInterval}
					>
						{#snippet placeholder()}
							<span class="lowercase">{selectedInterval}</span>
						{/snippet}

						{#each intervals as interval (interval)}
							<SelectItem class="lowercase" value={interval}>{interval}</SelectItem>
						{/each}
					</Select>
				</div>
			</div>

			<LineChart {data} {options} />
		</div>
	</div>
</div>
