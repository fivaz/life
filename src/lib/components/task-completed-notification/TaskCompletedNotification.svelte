<script lang="ts">
	import type { AnyTask } from '$lib/task/utils';

	import TypedCollection from '$lib/components/typed-collection/TypedCollection.svelte';
	import { getCompletedTasks } from '$lib/goal/utils';
	import { CheckCircle, XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { SignedIn } from 'sveltefire';

	export let task: AnyTask | undefined;

	let taskType: AnyTask;

	import { cubicOut } from 'svelte/easing';

	export function slideFromRight(node: Element, { delay = 0, duration = 400 }) {
		return {
			css: (t: number) => {
				// `t` is a value between 0 and 1 representing the transition progress
				const opacity = t;
				const transform = `translateX(${(1 - t) * 100}%)`; // Slide from 100% to 0%

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

	function getCompletedPercentage(tasks: AnyTask[]): number {
		const completedTasks = getCompletedTasks(tasks);
		const total = tasks.length;
		return Number(((completedTasks / total) * 100).toFixed(0));
	}

	$: {
		if (task) {
			setTimeout(() => {
				task = undefined;
			}, 5000);
		}
	}
</script>

<div
	aria-live="assertive"
	class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
>
	<div class="flex w-full flex-col items-center space-y-4 sm:items-end">
		{#if task && task.isDone}
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
								<SignedIn let:user>
									<TypedCollection
										let:data={tasks}
										ref="users/{user.uid}/goals/{task.goal.id}/tasks"
										type={taskType}
									>
										<p class="text-sm font-medium text-gray-900">Mission Completed</p>
										{@const percentage = getCompletedPercentage(tasks)}
										{#if percentage === 100}
											<p class="mt-1 text-sm text-gray-500">
												"Hero's Glory! You've achieved 100% completion on your journey!"
											</p>
										{:else}
											<p class="mt-1 text-sm text-gray-500">
												"You're {getCompletedPercentage(tasks)}% closer to conquering your quest!
												Fantastic progress!"
											</p>
										{/if}
									</TypedCollection>
								</SignedIn>
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
								on:click={() => (task = undefined)}
								type="button"
							>
								<span class="sr-only">Close</span>
								<Icon aria-hidden="true" class="h-5 w-5" src={XMark} />
							</button>
						</div>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>
