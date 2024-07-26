<script lang="ts">
	import type { AnyTask } from '$lib/task/utils';

	import { DbPaTH } from '$lib/consts';
	import { db } from '$lib/firebase';
	import { type Goal, getCompletedTasks } from '$lib/goal/utils';
	import { CheckCircle, XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { collection, getDocs } from 'firebase/firestore';
	import { onMount } from 'svelte';
	import { cubicOut } from 'svelte/easing';

	export let task: AnyTask;
	export let onRemove: () => void;

	export let userId: string;

	function getCompletedPercentage(tasks: AnyTask[]): number {
		const completedTasks = getCompletedTasks(tasks);
		const total = tasks.length;
		return Number(((completedTasks / total) * 100).toFixed(0));
	}

	async function fetchPercentageComplete(task: AnyTask & { goal: Goal }) {
		const tasksRef = collection(db, DbPaTH.USERS, userId, DbPaTH.GOALS, task.goal.id, DbPaTH.TASKS);
		const tasksSnapshot = await getDocs(tasksRef);
		const tasks = tasksSnapshot.docs.map((doc) => doc.data()) as AnyTask[];
		return getCompletedPercentage(tasks);
	}

	export function slideFromRight(node: Element, { delay = 0, duration = 400 }) {
		return {
			css: (t: number) => {
				const opacity = t;
				const transform = `translateX(${(1 - t) * 100}%)`;

				return `
					opacity: ${opacity};
					transform: ${transform};
				`;
			},
			delay,
			duration,
			easing: cubicOut,
		};
	}

	let percentage = 0;

	onMount(async () => {
		if (task.goal) {
			percentage = await fetchPercentageComplete(task as AnyTask & { goal: Goal });
		}

		setTimeout(() => {
			onRemove();
		}, 5000);
	});
</script>

<div
	class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
	transition:slideFromRight={{ duration: 500 }}
>
	<div class="p-4">
		<div class="flex items-start">
			<div class="flex-shrink-0">
				<Icon aria-hidden="true" class="h-6 w-6 text-green-400" src={CheckCircle} />
			</div>
			<div class="ml-3 w-0 flex-1 pt-0.5">
				{#if task.goal}
					<p class="text-sm font-medium text-gray-900">Mission Completed</p>
					{#if percentage === 100}
						<p class="mt-1 text-sm text-gray-500">
							"Hero's Glory! You've achieved 100% completion on your journey!"
						</p>
					{:else}
						<p class="mt-1 text-sm text-gray-500">
							"You're {percentage}% closer to conquering your quest! Fantastic progress!"
						</p>
					{/if}
				{:else}
					<p class="text-sm font-medium text-gray-900">Mission Completed</p>
					<p class="mt-1 text-sm text-gray-500">
						"Heroic Effort! You've successfully finished a task – well done!"
					</p>
				{/if}
			</div>
			<div class="ml-4 flex flex-shrink-0">
				<button
					class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
					on:click={onRemove}
					type="button"
				>
					<span class="sr-only">Close</span>
					<Icon aria-hidden="true" class="h-5 w-5" src={XMark} />
				</button>
			</div>
		</div>
	</div>
</div>
