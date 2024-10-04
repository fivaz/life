<script lang="ts">
	import type { Category } from '$lib/category/utils';
	import type { Goal } from '$lib/goal/utils';
	import type { AnyTask } from '$lib/task/utils';

	import { tailwindColors } from '$lib/category/utils';
	import Alert from '$lib/components/alert/Alert.svelte';
	import Button from '$lib/components/button/Button.svelte';
	import Collapsable from '$lib/components/collapsable/Collapsable.svelte';
	import ConfirmButton from '$lib/components/confirm-button/ConfirmButton.svelte';
	import Input from '$lib/components/input/Input.svelte';
	import Select from '$lib/components/select/Select.svelte';
	import SelectItem from '$lib/components/select/select-item/SelectItem.svelte';
	import { getEndTime } from '$lib/components/task-form/service';
	import TaskFormEvent from '$lib/components/task-form/task-form-event/TaskFormEvent.svelte';
	import TaskFormImage from '$lib/components/task-form/task-form-image/TaskFormImage.svelte';
	import TaskFormRecurring from '$lib/components/task-form/task-form-recurring/TaskFormRecurring.svelte';
	import { checkErrors, convertToAnyTask, convertToTaskIn } from '$lib/task/task-in-utils';
	import { EllipsisVertical, XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { clsx } from 'clsx';
	import { createEventDispatcher } from 'svelte';

	import GoalIcon from '../../../routes/dashboard/goals/goal-form/goal-icon/GoalIcon.svelte';

	export let task: AnyTask;

	export let goals: Goal[];

	export let categories: Category[];

	export let targetDate: string | undefined = undefined;

	let taskIn = convertToTaskIn(task);

	let wasRecurring = taskIn.isRecurring;

	let formerGoal = taskIn.goal;

	let errorMessage = '';

	let file: File | null = null;

	const dispatch = createEventDispatcher<{
		close: null;
		createTask: { data: Omit<AnyTask, 'id'>; file: File | null };
		editTask: {
			data: Omit<AnyTask, 'id'>;
			file: File | null;
			formerGoal: Goal | null;
			id: string;
			targetDate: string | undefined;
			wasRecurring: boolean;
		};
		removeTask: { targetDate: string | undefined; task: AnyTask };
	}>();

	$: isEditing = !!task.id;

	$: formName = `${isEditing ? 'Edit' : 'Add'} ${'startTime' in task ? 'Event' : 'Task'}`;

	function onSubmit() {
		errorMessage = checkErrors(taskIn);
		if (errorMessage) {
			return;
		}

		const { id, ...data } = convertToAnyTask(taskIn);

		if (id) {
			dispatch('editTask', { data, file, formerGoal, id, targetDate, wasRecurring });
		} else {
			dispatch('createTask', { data, file });
		}
	}
</script>

<form
	class="relative w-11/12 max-w-[355px] overflow-hidden rounded-md text-start font-medium shadow"
	on:submit|preventDefault={onSubmit}
>
	<div class="bg-neutral-100 p-4">
		<div class="flex flex-col gap-2 text-sm text-gray-700">
			<div class="flex items-center justify-between">
				<h2 class="text-lg text-gray-900">{formName}</h2>
				<div class="flex">
					<button class="rounded-md p-1 hover:bg-gray-200" type="button">
						<Icon class="h-5 w-auto" src={EllipsisVertical} />
					</button>
					<button
						class="rounded-md p-1 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-gray-50"
						on:click={() => dispatch('close')}
						type="button"
					>
						<span class="sr-only">Dismiss</span>
						<Icon aria-hidden="true" class="h-5 w-5" src={XMark} />
					</button>
				</div>
			</div>

			<Alert hasCloseButton={false} isVisible={!!errorMessage} type="error">
				{errorMessage}
			</Alert>

			<div class="flex items-center gap-3">
				<Input
					autocomplete="off"
					bind:value={taskIn.name}
					class="flex-1"
					name="name"
					placeholder="Name"
				/>

				<label>
					<input
						bind:checked={taskIn.isDone}
						class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
						name="isDone"
						type="checkbox"
					/>
				</label>
			</div>

			<Collapsable title="Image">
				<TaskFormImage bind:file bind:taskIn />
			</Collapsable>

			<Collapsable title="Description">
				<label class="block text-sm text-gray-700">
					<textarea
						bind:value={taskIn.description}
						class="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						name="description"
						placeholder="add a description with `[x] - sub task` to make it as a subtask of this task"
					/>
				</label>
			</Collapsable>

			<Select
				bind:value={taskIn.category}
				class="flex items-center"
				label="Category"
				labelClass="w-1/5"
				selectClass="flex-1"
			>
				<div class="flex items-center gap-3" slot="placeholder">
					<div class={clsx('h-5 w-5 rounded-md', tailwindColors[taskIn.category.color]?.darkBg)} />
					{taskIn.category.name}
				</div>

				{#each categories as category (category)}
					<SelectItem value={category}>
						<div class="flex items-center gap-3">
							<div class={clsx('h-5 w-5 rounded-md', tailwindColors[category.color]?.darkBg)} />
							{category.name}
						</div>
					</SelectItem>
				{/each}
			</Select>

			<Select
				bind:value={taskIn.goal}
				class="flex items-center"
				label="Goal"
				labelClass="w-1/5"
				selectClass="flex-1"
			>
				<span slot="placeholder">{taskIn.goal?.name || 'no goal'}</span>
				<SelectItem value={null}>no goal</SelectItem>
				{#each goals as goal (goal)}
					<SelectItem class="flex gap-2" value={goal}>
						<GoalIcon class="h-5 w-5" name={goal.icon} />
						<span class="w-[calc(100%-20px)] truncate">{goal.name}</span>
					</SelectItem>
				{/each}
			</Select>

			<div class="flex gap-3">
				<Input
					bind:value={taskIn.deadline}
					class="w-1/2"
					disabled={taskIn.isEvent}
					label="Deadline"
					name="deadline"
					type="date"
				/>

				<Input
					bind:value={taskIn.duration}
					class="w-1/2"
					label="Duration"
					name="duration"
					on:input={(e) => (taskIn.endTime = getEndTime(taskIn.startTime, e.detail))}
					required
					type="time"
				/>
			</div>

			<TaskFormEvent bind:taskIn />

			{#if taskIn.isEvent}
				<TaskFormRecurring bind:taskIn />
			{/if}
		</div>
	</div>

	<div class="flex justify-between bg-gray-50 px-4 py-3 text-right sm:px-6">
		{#if isEditing}
			<ConfirmButton
				color="red"
				confirmByKey="Delete"
				on:confirm={() => dispatch('removeTask', { targetDate, task })}
				type="button"
			>
				Delete
			</ConfirmButton>
		{:else}
			<div />
		{/if}

		<Button type="submit">
			{#if isEditing}
				Edit
			{:else}
				Add
			{/if}
		</Button>
	</div>
</form>
