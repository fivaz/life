<script lang="ts">
	import { EllipsisVertical } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Copy, ListTodo } from 'lucide-svelte';

	import type { Category } from '$lib/category/category.model';
	import { tailwindColorMap } from '$lib/category/category.utils';
	import CloseX from '$lib/components/close-x/CloseX.svelte';
	import Collapsable from '$lib/components/collapsable/Collapsable.svelte';
	import DropDown from '$lib/components/drop-down/DropDown.svelte';
	import Alert from '$lib/components/form/alert/Alert.svelte';
	import Button from '$lib/components/form/button/Button.svelte';
	import ConfirmButton from '$lib/components/form/confirm-button/ConfirmButton.svelte';
	import Input from '$lib/components/form/input/Input.svelte';
	import Select from '$lib/components/form/select/Select.svelte';
	import SelectItem from '$lib/components/form/select/select-item/SelectItem.svelte';
	import type { yyyyMMdd } from '$lib/date.utils.svelte.js';
	import type { Goal } from '$lib/goal/goal.model';
	import GoalIcon from '$lib/goal/goal-icon/GoalIcon.svelte';
	import { isTimed, type Task } from '$lib/task/task.model';
	import { isRecurring, isUntimed } from '$lib/task/task.model.js';
	import { addTask } from '$lib/task/task.repository';
	import {
		deletePossibleSingleRecurringEvent,
		duplicateTask,
		editTaskWithPrompt,
		taskIn,
	} from '$lib/task/task-form/service.svelte';
	import TaskFormEvent from '$lib/task/task-form/task-form-event/TaskFormEvent.svelte';
	import TaskFormImage from '$lib/task/task-form/task-form-image/TaskFormImage.svelte';
	import TaskFormRecurring from '$lib/task/task-form/task-form-recurring/TaskFormRecurring.svelte';
	import { checkErrors, convertToTask, convertToTaskIn } from '$lib/task/task-in-utils';
	import { sumTimes } from '$lib/task/time-utils';

	interface Props {
		userId: string;
		task: Task;
		goals: Goal[];
		categories: Category[];
		targetDate?: yyyyMMdd;
		close: () => void;
	}

	let { task, goals, categories, targetDate, userId, close }: Props = $props();

	taskIn.value = convertToTaskIn(task);

	$inspect(taskIn.value.id);

	const wasRecurring = isRecurring(task);

	const formerGoal = task.goal;

	let errorMessage = $state('');

	let file: File | null = $state(null);

	let isEditing = $derived(!!task.id);

	let formName = $derived(`${isEditing ? 'Edit' : 'Add'} ${isUntimed(task) ? 'Task' : 'Event'}`);

	function handleCreateTask(data: Omit<Task, 'id'>) {
		addTask(data, userId, file);
		close();
	}

	async function handleEditTask(data: Omit<Task, 'id'>, id: string) {
		if (
			await editTaskWithPrompt({ data, id, file, userId, targetDate, formerGoal, wasRecurring })
		) {
			close();
		}
	}

	async function removeTask() {
		if (await deletePossibleSingleRecurringEvent(task, userId, targetDate)) {
			close();
		}
	}

	function onSubmit(event: SubmitEvent) {
		event.preventDefault();
		errorMessage = checkErrors(taskIn.value);
		if (errorMessage) {
			return;
		}

		const { id, ...data } = convertToTask(taskIn.value);

		if (id) {
			handleEditTask(data, id);
		} else {
			handleCreateTask(data);
		}
	}

	// this ensures that whenever the user types - text, it converts to [ ] - text
	function formatSubTasks(description: string) {
		const regex = /(^|(?<=\n))-\s(.*?)\n/g;

		return description.replace(regex, '[ ] - $2\n');
	}

	function isAfterHalfToMidnight(task: Task): boolean {
		if (!isTimed(task)) return false;

		const [hours, minutes] = task.startTime.split(':').map(Number);

		if (hours < 23) return false;

		return minutes >= 30;
	}

	const optionsList = $derived.by(() => {
		const options: { icon?: typeof Copy; label: string; onclick: () => void }[] = [
			{
				icon: ListTodo,
				label: taskIn.value.isDone ? 'Mark as completed' : 'Mark as uncompleted',
				//setTimeout is necessary so the text doesn't change before the animation closes the dropdown
				onclick: () => setTimeout(() => (taskIn.value.isDone = !taskIn.value.isDone), 100),
			},
		];

		if (!isAfterHalfToMidnight(task)) {
			options.push({
				icon: Copy,
				label: 'Duplicate task',
				onclick: () => {
					duplicateTask(task, userId);
					close();
				},
			});
		}

		return options;
	});
</script>

<form
	class="relative w-11/12 max-w-[355px] overflow-hidden rounded-md text-start font-medium shadow"
	onsubmit={onSubmit}
>
	<div class="bg-neutral-100 p-4">
		<div class="flex flex-col gap-2 text-sm text-gray-700">
			<div class="flex items-center justify-between">
				<h2 class="text-lg text-gray-900">{formName}</h2>
				<div class="flex items-center">
					<DropDown
						class="w-48"
						itemClass="text-gray-700"
						list={optionsList}
						position="bottom-left"
					>
						<div class="rounded-md p-1 hover:bg-gray-200">
							<Icon class="h-5 w-auto" src={EllipsisVertical} />
						</div>
					</DropDown>
					<CloseX {close} />
				</div>
			</div>

			<Alert hasCloseButton={false} isVisible={!!errorMessage} type="error">
				{errorMessage}
			</Alert>

			<!--name-->
			<Input class="flex-1" autocomplete="off" placeholder="Name" bind:value={taskIn.value.name} />

			<!--image-->
			<Collapsable title="Image">
				<TaskFormImage bind:file />
			</Collapsable>

			<!--description-->
			<Collapsable title="Description">
				<label class="block text-sm text-gray-700">
					<textarea
						class="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						oninput={(e) => (taskIn.value.description = formatSubTasks(e.currentTarget.value))}
						placeholder="Create subtasks for this task using bullet points with `-`. Fill in the boxes to mark them as completed."
						value={taskIn.value.description}
					></textarea>
				</label>
			</Collapsable>

			<!--category-->
			<Select
				class="flex items-center"
				label="Category"
				labelClass="w-1/5"
				selectClass="flex-1"
				bind:value={taskIn.value.category}
			>
				{#snippet placeholder()}
					<div class="flex items-center gap-3">
						<div
							class="h-5 w-5 rounded-md {tailwindColorMap[taskIn.value.category.color]?.darkBg}"
						></div>
						{taskIn.value.category.name}
					</div>
				{/snippet}
				{#each categories as category (category)}
					<SelectItem value={category}>
						<div class="flex items-center gap-3">
							<div class="h-5 w-5 rounded-md {tailwindColorMap[category.color]?.darkBg}"></div>
							{category.name}
						</div>
					</SelectItem>
				{/each}
			</Select>

			<!--goal-->
			<Select
				class="flex items-center"
				label="Goal"
				labelClass="w-1/5"
				selectClass="flex-1"
				bind:value={taskIn.value.goal}
			>
				{#snippet placeholder()}
					{taskIn.value.goal?.name || 'no goal'}
				{/snippet}
				<SelectItem value={null}>no goal</SelectItem>
				{#each goals as goal (goal)}
					<SelectItem class="flex gap-2" value={goal}>
						<GoalIcon name={goal.icon} class="h-5 w-5" />
						<span class="w-[calc(100%-20px)] truncate">{goal.name}</span>
					</SelectItem>
				{/each}
			</Select>

			<!--date AND duration-->
			<div class="flex gap-3">
				<Input class="w-1/2" label="Date" type="date" bind:value={taskIn.value.date} />

				<Input
					class="w-1/2"
					label="Duration"
					oninput={(input) => (taskIn.value.endTime = sumTimes(taskIn.value.startTime, input))}
					required
					type="time"
					bind:value={taskIn.value.duration}
				/>
			</div>

			<TaskFormEvent />

			<TaskFormRecurring />
		</div>
	</div>

	<div class="flex justify-between bg-gray-50 px-4 py-3 text-right sm:px-6">
		{#if isEditing}
			<ConfirmButton color="red" confirm={removeTask} confirmByKey="Delete" type="button">
				Delete
			</ConfirmButton>
		{:else}
			<div></div>
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
