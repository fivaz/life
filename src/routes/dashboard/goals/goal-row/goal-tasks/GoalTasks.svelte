<script lang="ts">
	import type { Category } from '$lib/category/utils';
	import type { Goal } from '$lib/goal/utils';
	import type { AnyTask } from '$lib/task/utils';

	import { buildEmptyTask } from '$lib/components/task-form/service';
	import TaskFormWrapper from '$lib/components/task-form-wrapper/TaskFormWrapper.svelte';
	import TypedCollection from '$lib/components/typed-collection/TypedCollection.svelte';
	import { CheckBadge } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { clsx } from 'clsx';
	import { SignedIn } from 'sveltefire';

	export let tasks: AnyTask[];

	let showForm = false;

	export let goal: Goal;

	let editingTask: AnyTask = buildEmptyTask([], goal);

	let categoryType: Category;
</script>

<ul
	class="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl"
	role="list"
>
	{#each tasks as task (task)}
		<li class="relative flex justify-between gap-x-6 px-2 py-3 hover:bg-gray-50 sm:px-6">
			<div class="flex-auto">
				<button
					class={clsx(
						{ 'line-through': task.isDone },
						'text-sm font-semibold leading-6 text-gray-900',
					)}
					on:click={() => {
						showForm = true;
						editingTask = task;
					}}
				>
					{task.name}
				</button>
			</div>
			<div class="flex shrink-0 items-center gap-x-4">
				{#if task.isDone}<Icon class="h-6 w-6" src={CheckBadge} />{/if}
			</div>
		</li>
	{/each}
	<SignedIn let:user>
		<TypedCollection let:data={categories} ref={`users/${user.uid}/categories`} type={categoryType}>
			<TaskFormWrapper bind:show={showForm} {categories} {editingTask} userId={user.uid} />
		</TypedCollection>
	</SignedIn>
</ul>
