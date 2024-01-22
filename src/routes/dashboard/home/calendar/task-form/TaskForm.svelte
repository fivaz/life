<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance, applyAction } from '$app/forms';
	import { categories } from '$lib/category/store';
	import Button from '$lib/components/button/Button.svelte';
	import DaysCheckbox from '$lib/components/days-checkbox/DaysCheckbox.svelte';
	import { createModal } from '$lib/components/dialog/service';
	import Input from '$lib/components/input/Input.svelte';
	import SelectItem from '$lib/components/select/select-item/SelectItem.svelte';
	import Select from '$lib/components/select/Select.svelte';
	import { UnknownError } from '$lib/consts';
	import { removeTask, updateTasks } from '$lib/task/store';
	import Flatpickr from 'svelte-flatpickr';
	import type { TaskIn } from '../service';
	import { getDuration, getEndTime, formatDates, isEventsDateInverted } from './service';
	import 'flatpickr/dist/themes/airbnb.css';
	import { closeModal } from '$lib/form-modal/store';
	import type { SubSubmitFunction } from '$lib/types-utils';
	import type { ActionData } from '../../../../../../.svelte-kit/types/src/routes/dashboard/home/$types';
	import { goals } from '$lib/goal/store';
	import Alert from '$lib/components/alert/Alert.svelte';
	import Toggle from '$lib/components/toggle/Toggle.svelte';
	import { Disclosure, DisclosureButton, DisclosurePanel } from '@rgossiaux/svelte-headlessui';
	import { slide } from 'svelte/transition';

	export let form: ActionData | null;

	export let task: TaskIn;

	export let targetDate: Date | null = null;

	$: isEditing = !!task.id;

	const DELETE_ACTION = '?/remove';
	const CREATE_ACTION = '?/create';
	const UPDATE_ACTION = '?/update';

	let error = '';

	$: {
		if (isEventsDateInverted(task)) {
			error = 'start date should be before end date';
		} else if ($categories.length === 0) {
			error = 'create a category first';
		} else {
			error = '';
		}
	}

	$: categoryName =
		$categories.find((category) => category.id === task.categoryId)?.name ||
		'create a category first';

	$: goalName = $goals.find((goal) => goal.id === task.goalId)?.name || 'no goal';

	$: formName = `${isEditing ? 'Edit' : 'Add'} ${task.isEvent ? 'Event' : 'Task'}`;

	const handleDelete: SubSubmitFunction = async () => {
		const result = await createModal({ title: 'Are you sure?' });

		if (!result) {
			return () => {};
		}
		closeModal();

		return async ({ result }) => {
			await applyAction(result);
			if (result.type === 'success' && form?.removed) {
				removeTask(form.removed);
			} else {
				console.log(form?.error || UnknownError);
			}
		};
	};

	const handleCreate: SubSubmitFunction = ({ formData }) => {
		formatDates(task, formData);

		closeModal();

		return async ({ result }) => {
			await applyAction(result);
			if (result.type === 'success' && form?.created) {
				updateTasks(form.created);
			} else {
				console.log(form?.error || UnknownError);
			}
		};
	};

	const handleEdit: SubSubmitFunction = async ({ formData }) => {
		formatDates(task, formData);

		if (task.isEvent) {
			if (task.wasRecurring && task.isRecurring) {
				const result = await createModal({
					title: 'This is a repeating event',
					message: 'Do you want to save the changes for ?',
					confirmText: 'this event only',
					cancelText: 'future events',
				});

				if (result === null) {
					return () => {};
				}

				formData.set('isForThisEventOnly', result ? 'true' : '');
			}
		}
		closeModal();

		return async ({ result }) => {
			await applyAction(result);
			if (result.type === 'success' && form?.updated) {
				updateTasks(form.updated);
			} else {
				console.log(form?.error || UnknownError);
			}
		};
	};

	const submit: SubmitFunction = async ({ formData, action }) => {
		if (action.search === DELETE_ACTION) {
			return handleDelete({ formData });
		} else if (action.search === CREATE_ACTION) {
			return handleCreate({ formData });
		} else if (action.search === UPDATE_ACTION) {
			return handleEdit({ formData });
		}
	};
</script>

<form
	method="POST"
	action={isEditing ? UPDATE_ACTION : CREATE_ACTION}
	use:enhance={submit}
	class="w-[355px] shadow rounded-md overflow-hidden relative"
>
	<div class="flex flex-col gap-2 px-4 py-5 bg-white sm:p-6">
		<h2 class="text-lg font-medium text-gray-900">
			{formName}
		</h2>

		<Alert type="error" isVisible={!!error} hasCloseButton={false}>{error}</Alert>

		<input type="hidden" name="id" value={task.id} />
		<input type="hidden" name="categoryName" value={categoryName} />
		<input type="hidden" name="targetDate" value={targetDate?.toISOString() || null} />

		<div class="flex gap-3 items-center">
			<Input class="flex-1" label="Name" autocomplete="off" name="name" bind:value={task.name} />

			<label>
				<input
					name="isDone"
					type="checkbox"
					bind:checked={task.isDone}
					class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
				/>
			</label>
		</div>

		<div class="flex gap-3 items-center">
			<Select bind:value={task.categoryId} name="categoryId" label="Category" class="w-1/2">
				<span slot="placeholder">{categoryName}</span>
				{#each $categories as category (category)}
					<SelectItem value={category.id}>{category.name}</SelectItem>
				{/each}
			</Select>

			<Select bind:value={task.goalId} name="goalId" label="Goal" class="w-1/2">
				<span slot="placeholder">{goalName}</span>
				{#each $goals as goal (goal)}
					<SelectItem value={goal.id}>{goal.name}</SelectItem>
				{/each}
			</Select>
		</div>

		<label class="block text-sm font-medium text-gray-700 mb-1">
			Description
			<textarea
				name="description"
				bind:value={task.description}
				class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
			/>
		</label>

		<Input
			label="Deadline"
			type="date"
			name="deadline"
			bind:value={task.deadline}
			disabled={task.isEvent}
		/>

		<Disclosure class="bg-white rounded-lg p-2" let:open>
			<div class="flex justify-between">
				<DisclosureButton>Event</DisclosureButton>
				<Toggle name="isEvent" bind:value={task.isEvent} />
			</div>

			{#if open}
				<div transition:slide>
					<DisclosurePanel static>
						<div class="flex gap-3">
							<Input
								class="w-1/2"
								label="Date"
								type="date"
								name="date"
								bind:value={task.date}
								required
							/>

							<Input
								class="w-1/2"
								label="Duration"
								type="time"
								name="duration"
								required
								bind:value={task.duration}
								on:input={(e) => (task.endTime = getEndTime(task.startTime, e.detail))}
							/>
						</div>

						<div class="flex gap-3">
							<Input
								class="w-1/2"
								label="Start time"
								type="time"
								name="startTime"
								required
								bind:value={task.startTime}
								on:input={(e) => {
									task.endTime = getEndTime(e.detail, task.duration);
								}}
							/>

							<Input
								class="w-1/2"
								label="End time"
								type="time"
								name="endTime"
								required
								bind:value={task.endTime}
								on:input={(e) => (task.duration = getDuration(task.startTime, e.detail))}
							/>
						</div>
					</DisclosurePanel>
				</div>
			{/if}
		</Disclosure>

		{#if task.isEvent}
			<Disclosure class="bg-white rounded-lg p-2" let:open>
				<div class="flex justify-between">
					<DisclosureButton>Recurring</DisclosureButton>
					<Toggle name="isEvent" value={task.isRecurring} />
				</div>

				{#if open}
					<div transition:slide>
						<DisclosurePanel static>
							<div class="flex gap-3">
								<Input
									class="w-1/2"
									label="Start at"
									type="date"
									name="recurringStartAt"
									required
									bind:value={task.recurringStartAt}
								/>

								<Input
									class="w-1/2"
									label="End at"
									type="date"
									name="recurringEndAt"
									required
									bind:value={task.recurringEndAt}
								/>
							</div>
							<div class="">
								<h3 class="block text-sm font-medium text-gray-700 mb-1">Repeat every</h3>
								<DaysCheckbox
									class="flex justify-around"
									name="recurringDaysOfWeek"
									bind:value={task.recurringDaysOfWeek}
								/>
							</div>

							<div>
								<label
									for="recurringExceptions"
									class="block text-sm font-medium text-gray-700 mb-1"
								>
									Exclude on
								</label>
								<Flatpickr
									id="recurringExceptions"
									class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									name="recurringExceptions"
									options={{
										mode: 'multiple',
										dateFormat: 'Y-m-d',
									}}
									bind:value={task.recurringExceptions}
								/>
							</div>
						</DisclosurePanel>
					</div>
				{/if}
			</Disclosure>
		{/if}
	</div>

	<div class="flex justify-between px-4 py-3 bg-gray-50 text-right sm:px-6">
		{#if isEditing}
			<Button formaction={DELETE_ACTION} color="red">Delete</Button>
		{:else}
			<div />
		{/if}

		<Button disabled={error} type="submit">
			{#if isEditing} Edit {:else} Add {/if}
		</Button>
	</div>
</form>
