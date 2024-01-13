<script lang="ts">
	import type { ActionResult, MaybePromise, SubmitFunction } from '@sveltejs/kit';
	import { enhance, applyAction } from '$app/forms';
	import { categories } from '$lib/category/store';
	import Button from '$lib/components/button/Button.svelte';
	import DaysCheckbox from '$lib/components/days-checkbox/DaysCheckbox.svelte';
	import { createModal } from '$lib/components/dialog/service';
	import Input from '$lib/components/input/Input.svelte';
	import SelectItem from '$lib/components/select/select-item/SelectItem.svelte';
	import Select from '$lib/components/select/Select.svelte';
	import { TIME, UnknownError } from '$lib/consts';
	import { removeTask, updateTasks } from '$lib/task/store';
	import classnames from 'classnames';
	import { isAfter, parse } from 'date-fns';
	import Flatpickr from 'svelte-flatpickr';
	import type { TaskIn } from '../service';
	import { getDuration, getEndTime, buildDates } from './service';
	import 'flatpickr/dist/themes/airbnb.css';
	import type { TTask } from '$lib/task/utils';
	import { closeModal } from '$lib/form-modal/store';

	export let form: {
		created?: TTask;
		updated?: TTask | TTask[];
		removed?: TTask;
		error?: string;
	} | null = null;

	export let task: TaskIn;

	export let isOnlyEvent: boolean;

	$: isEditing = !!task.id;

	const DELETE_ACTION = '?/remove';
	const CREATE_ACTION = '?/create';
	const UPDATE_ACTION = '?/update';

	$: error =
		task.isEvent &&
		!isAfter(parse(task.endTime, TIME, new Date()), parse(task.startTime, TIME, new Date()));

	// TODO show an error if no category exists
	// create the 3 categories on Register
	$: categoryName =
		$categories.find((category) => category.id === task.categoryId)?.name ||
		'create a category first';

	type SubSubmitFunction = ({
		formData,
	}: {
		formData: FormData;
	}) => MaybePromise<(opts: { result: ActionResult }) => void>;

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
		if (task.isEvent) {
			buildDates(formData);
		}
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
		if (task.isEvent) {
			buildDates(formData);

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

	export const submit: SubmitFunction = async ({ formData, action }) => {
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
			{#if isEditing}
				Edit Event
			{:else}
				Add Event
			{/if}
		</h2>

		{#if error}
			<p class="text-red-500">startDate should be before endDate</p>
		{/if}

		<input type="hidden" name="id" value={task.id} />
		<input type="hidden" name="categoryName" value={categoryName} />

		<Input
			labelClass="flex-1"
			label="Name"
			autocomplete="off"
			name="name"
			bind:value={task.name}
			class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
		/>

		<div class="flex gap-3 items-center">
			<Select bind:value={task.categoryId} name="categoryId" label="Category" class="flex-1">
				<span slot="placeholder">{categoryName}</span>
				{#each $categories as category (category)}
					<SelectItem value={category.id}>{category.name}</SelectItem>
				{/each}
			</Select>

			<label class="pt-5">
				<input
					name="isDone"
					type="checkbox"
					bind:checked={task.isDone}
					class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
				/>
			</label>
		</div>

		<label class="block text-sm font-medium text-gray-700 mb-1">
			Description
			<textarea
				name="description"
				bind:value={task.description}
				class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
			/>
		</label>

		<div class={classnames({ hidden: isOnlyEvent }, 'flex justify-start')}>
			<label class="flex gap-2 items-center text-sm font-medium text-gray-700">
				Event
				<input
					name="isEvent"
					type="checkbox"
					bind:checked={task.isEvent}
					class="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
				/>
				<!--mt-1 is to align the checkbox with the label-->
			</label>
		</div>

		{#if task.isEvent}
			<div class="flex gap-3">
				<Input
					labelClass="w-1/2"
					label="Date"
					type="date"
					name="date"
					bind:value={task.date}
					required
				/>

				<Input
					labelClass="w-1/2"
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
					labelClass="w-1/2"
					label="Start time"
					type="time"
					name="startTime"
					required
					bind:value={task.startTime}
				/>

				<Input
					labelClass="w-1/2"
					label="End time"
					type="time"
					name="endTime"
					required
					bind:value={task.endTime}
					on:input={(e) => (task.duration = getDuration(task.startTime, e.detail))}
				/>
			</div>

			<div class="flex justify-start">
				<label class="flex gap-2 items-center text-sm font-medium text-gray-700">
					Recurring
					<input
						name="isRecurring"
						type="checkbox"
						bind:checked={task.isRecurring}
						class="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
					/>
					<!--mt-1 is to align the checkbox with the label-->
				</label>
			</div>

			{#if task.isRecurring}
				<div class="flex gap-3">
					<Input
						labelClass="w-1/2"
						label="Start at"
						type="date"
						name="recurringStartAt"
						required
						bind:value={task.recurringStartAt}
					/>

					<Input
						labelClass="w-1/2"
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
					<label for="recurringExceptions" class="block text-sm font-medium text-gray-700 mb-1">
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
			{/if}
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
