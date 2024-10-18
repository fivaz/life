<script lang="ts">
	import type { Goal } from '$lib/goal/utils';
	import type { Task } from '$lib/task/utils';

	import ProgressBar from '$lib/components/progress-bar/ProgressBar.svelte';
	import { getCompletedTasks } from '$lib/goal/utils';
	import { Disclosure, DisclosureButton, DisclosurePanel } from '@rgossiaux/svelte-headlessui';
	import { ChevronDown, ChevronUp, Plus, Settings2 } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { clsx } from 'clsx';
	import { createEventDispatcher } from 'svelte';

	import GoalIcon from '../goal-form/goal-icon/GoalIcon.svelte';
	import GoalTasks from './goal-tasks/GoalTasks.svelte';

	export let goal: Goal;
	export let tasks: Task[];

	const dispatch = createEventDispatcher<{ addTask: null; editGoal: Goal }>();

	export function getNumberOfTasks(tasks: Task[]) {
		if (tasks.length === 0) {
			return '';
		}
		if (tasks.length === 1) {
			return '1 task';
		}
		return `${tasks.length} tasks`;
	}
</script>

<li
	class="rounded-lg bg-gray-50 py-3 text-base leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/5"
>
	<Disclosure let:open>
		<DisclosureButton class="w-full">
			<div class={'flex items-center justify-between px-3 pb-2'}>
				<div
					class={clsx('flex w-[calc(100%-70px)] items-center gap-2 truncate', {
						'line-through': goal.isDone,
					})}
				>
					<GoalIcon class="h-5 w-5 text-indigo-600" name={goal.icon} />
					<span>{goal.name}</span>
				</div>

				<div>
					<button
						class="rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
						on:click={() => dispatch('addTask')}
						type="button"
					>
						<Icon class="h-4 w-4" src={Plus} />
					</button>
					<button
						class="rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
						on:click={() => dispatch('editGoal', goal)}
						type="button"
					>
						<Icon class="h-4 w-4 text-black" src={Settings2} />
					</button>
				</div>
			</div>

			{#if tasks.length}
				<ProgressBar maxValue={tasks.length} value={getCompletedTasks(tasks)} />

				{#if !open}
					<div class="flex w-full items-end justify-center gap-2 hover:bg-gray-100 hover:underline">
						<span>{getNumberOfTasks(tasks)}</span>
						<Icon class="h-4 w-4 animate-bounce" src={ChevronDown} />
					</div>
				{/if}
			{/if}
		</DisclosureButton>

		<div class="text-sm">
			{#if tasks.length}
				<DisclosurePanel let:close>
					<GoalTasks on:editTask {tasks} />

					<button
						class="flex w-full items-end justify-center gap-2 text-base hover:bg-gray-100 hover:underline"
						on:click={() => close(null)}
					>
						<span>{getNumberOfTasks(tasks)}</span>
						<Icon class="h-4 w-4 animate-bounce" src={ChevronUp} />
					</button>
				</DisclosurePanel>
			{:else}
				<div class="px-3 text-red-500">No tasks yet</div>
			{/if}
		</div>
	</Disclosure>
</li>
