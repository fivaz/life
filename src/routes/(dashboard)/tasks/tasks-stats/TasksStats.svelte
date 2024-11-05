<script lang="ts">
	import { getTotalDuration } from '$lib/task/time-utils';
	import { Grid3x3, LayoutGrid } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';

	import type { SortedTaskType } from '../service';
	import { CategoryTypes } from '$lib/category/utils';

	interface Props {
		tasks: SortedTaskType;
	}

	let { tasks }: Props = $props();

	let netSortedTasks = $derived(prepareSortedTasks(tasks));

	let total = $derived(Object.values(netSortedTasks).flat());

	let workTasks = $derived(total.filter((task) => task.category.type === CategoryTypes.WORK));

	function prepareSortedTasks(sortedTasks: SortedTaskType): SortedTaskType {
		let copiedObject = { ...sortedTasks };
		delete copiedObject.Recurring;
		return copiedObject;
	}
</script>

<div class="relative w-11/12 max-w-80 text-sm leading-6 text-gray-900">
	<div class="divide-y divide-gray-900/5 rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
		<div class="p-6 text-base font-semibold">Tasks stats</div>

		<ul class="flex flex-col py-3">
			<li
				class="flex cursor-pointer justify-between gap-3 px-6 py-3 font-semibold hover:bg-gray-100"
			>
				<div class="grow">deadline</div>
				<div class="w-16">quantity</div>
				<div class="w-16 text-right">duration</div>
			</li>
			{#each netSortedTasks as date (date)}
				<li class="flex cursor-pointer justify-between gap-3 px-6 py-3 hover:bg-gray-100">
					<div class="flex grow gap-3">
						<Icon class="h-6 w-6 text-gray-400" src={LayoutGrid} />
						<div>{date}</div>
					</div>
					<div class="w-16 text-center">{tasks[date].length}</div>
					<div class="w-16 text-right">{getTotalDuration(tasks[date])}</div>
				</li>
			{/each}
			<li class="flex cursor-pointer justify-between gap-3 px-6 py-3 hover:bg-gray-100">
				<div class="flex grow gap-3">
					<Icon class="h-6 w-6 text-gray-400" src={Grid3x3} />
					<div>Work tasks</div>
				</div>
				<div class="w-16 text-center">{workTasks.length}</div>
				<div class="w-16 text-right">{getTotalDuration(workTasks)}</div>
			</li>
			<li class="flex cursor-pointer justify-between gap-3 px-6 py-3 hover:bg-gray-100">
				<div class="flex grow gap-3">
					<Icon class="h-6 w-6 text-gray-400" src={Grid3x3} />
					<div>Total</div>
				</div>
				<div class="w-16 text-center">{total.length}</div>
				<div class="w-16 text-right">{getTotalDuration(total)}</div>
			</li>
		</ul>
	</div>
</div>
