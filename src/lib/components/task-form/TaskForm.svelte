<script lang="ts">
	import { Transition } from '@rgossiaux/svelte-headlessui';
	import { XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import type { Category } from '$lib/category/utils';
	import Alert from '$lib/components/alert/Alert.svelte';
	import Button from '$lib/components/button/Button.svelte';
	import DaysCheckbox from '$lib/components/days-checkbox/DaysCheckbox.svelte';
	import { weekDays } from '$lib/components/days-checkbox/service';
	import Input from '$lib/components/input/Input.svelte';
	import SelectItem from '$lib/components/select/select-item/SelectItem.svelte';
	import Select from '$lib/components/select/Select.svelte';
	import SlimCollection from '$lib/components/slim-collection/SlimCollection.svelte';
	import {
		convertToTaskIn,
		addTask,
		deleteTask,
		editTaskWithPrompt,
		getDuration,
		getEndTime,
	} from '$lib/components/task-form/service';
	import Toggle from '$lib/components/toggle/Toggle.svelte';
	import { DATE, TIME } from '$lib/consts';
	import type { AnyTask } from '$lib/task/utils';
	import { convertToAnyTask } from '$lib/task/utils';
	import { addMinutes, addMonths, endOfWeek, format, isAfter, parse } from 'date-fns';
	import { createEventDispatcher } from 'svelte';
	// TODO check later how I should import a precompiled component https://github.com/sveltejs/svelte/issues/604
	import Flatpickr from 'svelte-flatpickr';
	import type { TaskIn } from './service';
	import 'flatpickr/dist/themes/airbnb.css';

	// TODO add all things related to task like TaskForm in a task folder
	export let userId: string;

	export let task: AnyTask;

	export let categories: Category[];

	export let targetDate: Date | undefined = undefined;

	let taskIn: TaskIn = convertToTaskIn(task);

	let wasRecurring = taskIn.isRecurring;

	let isEventOpen = false;

	let isRecurringOpen = false;

	const dispatch = createEventDispatcher<{ close: null }>();

	let errorMessage = '';

	$: isEditing = !!task.id;

	$: formName = `${isEditing ? 'Edit' : 'Add'} ${'startTime' in task ? 'Event' : 'Task'}`;

	function isValid() {
		if (taskIn.startTime && taskIn.endTime) {
			if (
				!isAfter(parse(taskIn.endTime, TIME, new Date()), parse(taskIn.startTime, TIME, new Date()))
			) {
				errorMessage = 'start time should be before end time';
				return false;
			}
		}
		return true;
	}

	function onSubmit() {
		if (!isValid()) {
			return;
		}

		const { id, ...data } = convertToAnyTask(taskIn);

		if (id) {
			editTaskWithPrompt(id, data, userId, targetDate, wasRecurring);
		} else {
			addTask(data, userId);
		}

		dispatch('close');
	}
</script>

<form
	on:submit|preventDefault={onSubmit}
	class="w-[355px] shadow rounded-md overflow-hidden relative"
>
	<div class="bg-neutral-100 px-4 py-5 sm:p-4">
		<div class="flex justify-between items-center pb-2">
			<h2 class="text-lg font-medium text-gray-900">{formName}</h2>
			<button
				type="button"
				class="pl-2 inline-flex rounded-md p-1.5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-gray-50"
				on:click={() => dispatch('close')}
			>
				<span class="sr-only">Dismiss</span>
				<Icon src={XMark} class="h-5 w-5" aria-hidden="true" />
			</button>
		</div>

		<Alert type="error" isVisible={!!errorMessage} hasCloseButton={false}>
			{errorMessage}
		</Alert>

		<div class="flex flex-col gap-2 text-sm font-medium text-gray-700">
			<div class="flex gap-3 items-center">
				<Input
					class="flex-1"
					placeholder="Name"
					autocomplete="off"
					name="name"
					bind:value={taskIn.name}
				/>

				<label>
					<input
						name="isDone"
						type="checkbox"
						class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
						bind:value={taskIn.isDone}
					/>
				</label>
			</div>

			<label class="block text-sm font-medium text-gray-700">
				<textarea
					name="description"
					placeholder="description"
					class="p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					bind:value={taskIn.description}
				/>
			</label>

			<Select
				bind:value={taskIn.category}
				name="category"
				label="Category"
				class="flex items-center"
				labelClass="w-1/5"
				selectClass="flex-1"
			>
				<span slot="placeholder">{taskIn.category.name}</span>
				{#each categories as category (category)}
					<SelectItem value={category}>{category.name}</SelectItem>
				{/each}
			</Select>

			<SlimCollection ref={`users/${userId}/goals`} let:data={goals}>
				<Select
					bind:value={taskIn.goal}
					name="goal"
					label="Goal"
					class="flex items-center"
					labelClass="w-1/5"
					selectClass="flex-1"
				>
					<span slot="placeholder">{taskIn.goal?.name || 'no goal'}</span>
					<SelectItem value={null}>no goal</SelectItem>
					{#each goals as goal (goal)}
						<SelectItem value={goal}>{goal.name}</SelectItem>
					{/each}
				</Select>
			</SlimCollection>

			<Input
				type="date"
				name="deadline"
				label="Deadline"
				class="flex items-center"
				labelClass="w-1/5"
				inputClass="flex-1"
				disabled={taskIn.isEvent}
				bind:value={taskIn.deadline}
			/>

			<div class="bg-white rounded-lg p-2">
				<div class="flex">
					<button
						class="flex-1 text-start"
						type="button"
						on:click={() => {
							if (taskIn.isEvent) {
								isEventOpen = !isEventOpen;
							} else {
								taskIn.isEvent = true;
							}
						}}
					>
						Event
					</button>
					<Toggle
						bind:value={taskIn.isEvent}
						on:change={(e) => {
							isEventOpen = e.detail;
							if (e.detail) {
								taskIn.deadline = '';

								taskIn.duration = '00:15';
								taskIn.startTime = format(new Date(), TIME);
								taskIn.endTime = format(addMinutes(new Date(), 15), TIME);
								taskIn.date = format(new Date(), DATE);
							} else {
								taskIn.isRecurring = false;

								taskIn.deadline = format(endOfWeek(new Date()), DATE);

								taskIn.duration = '';
								taskIn.startTime = '';
								taskIn.endTime = '';
								taskIn.date = '';
							}
						}}
					/>
				</div>

				{#if taskIn.isEvent}
					<Transition
						class="transition-all duration-500 overflow-hidden"
						enterFrom="transform opacity-0 max-h-0"
						enterTo="transform opacity-100 max-h-36"
						leaveFrom="transform opacity-100 max-h-36"
						leaveTo="transform opacity-0 max-h-0"
						unmount={false}
						show={isEventOpen}
					>
						<div class="flex gap-3 pt-2 overflow-hidden">
							<Input
								class="w-1/2"
								label="Date"
								type="date"
								name="date"
								bind:value={taskIn.date}
								required
							/>

							<Input
								class="w-1/2"
								label="Duration"
								type="time"
								name="duration"
								bind:value={taskIn.duration}
								on:input={(e) => (taskIn.endTime = getEndTime(taskIn.startTime, e.detail))}
								required
							/>
						</div>

						<div class="flex gap-3">
							<Input
								class="w-1/2"
								label="Start time"
								type="time"
								name="startTime"
								bind:value={taskIn.startTime}
								on:input={(e) => (taskIn.endTime = getEndTime(e.detail, taskIn.duration))}
								required
							/>

							<Input
								class="w-1/2"
								label="End time"
								type="time"
								name="endTime"
								required
								bind:value={taskIn.endTime}
								on:input={(e) => (taskIn.duration = getDuration(taskIn.startTime, e.detail))}
							/>
						</div>
					</Transition>
				{/if}
			</div>

			{#if taskIn.isEvent}
				<div class="bg-white rounded-lg p-2">
					<div class="flex">
						<button
							class="flex-1 text-start"
							type="button"
							on:click={() => {
								if (taskIn.isRecurring) {
									isRecurringOpen = !isRecurringOpen;
								} else {
									taskIn.isRecurring = true;
								}
							}}
						>
							Recurring
						</button>
						<Toggle
							bind:value={taskIn.isRecurring}
							on:change={(e) => {
								if (e.detail === true) {
									isRecurringOpen = true;
									taskIn.recurringDaysOfWeek = weekDays.slice(1, 6);
									taskIn.recurringStartAt = format(new Date(), DATE);
									taskIn.recurringEndAt = format(addMonths(new Date(), 1), DATE);
									taskIn.recurringExceptions = [];
								} else {
									taskIn.recurringStartAt = '';
									taskIn.recurringEndAt = '';
									taskIn.recurringExceptions = [];
								}
							}}
						/>
					</div>

					{#if taskIn.isRecurring}
						<Transition
							class="transition-all duration-500 overflow-hidden"
							enterFrom="transform opacity-0 max-h-0"
							enterTo="transform opacity-100 max-h-36"
							leaveFrom="transform opacity-100 max-h-36"
							leaveTo="transform opacity-0 max-h-0"
							unmount={false}
							show={isRecurringOpen}
						>
							<div class="flex gap-3 pt-2">
								<Input
									class="w-1/2"
									label="Start at"
									type="date"
									name="recurringStartAt"
									required
									bind:value={taskIn.recurringStartAt}
								/>

								<Input
									class="w-1/2"
									label="End at"
									type="date"
									name="recurringEndAt"
									required
									bind:value={taskIn.recurringEndAt}
								/>
							</div>
							<div>
								<h3 class="block text-sm font-medium text-gray-700 mb-1">Repeat every</h3>
								<DaysCheckbox
									class="flex justify-around"
									name="recurringDaysOfWeek"
									bind:value={taskIn.recurringDaysOfWeek}
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
									bind:value={taskIn.recurringExceptions}
								/>
							</div>
						</Transition>
					{/if}
				</div>
			{/if}
		</div>
	</div>

	<div class="flex justify-between px-4 py-3 bg-gray-50 text-right sm:px-6">
		{#if isEditing}
			<Button color="red" type="button" on:click={() => deleteTask(task.id, userId, dispatch)}>
				Delete
			</Button>
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
