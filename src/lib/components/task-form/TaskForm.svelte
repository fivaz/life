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
	import Toggle from '$lib/components/toggle/Toggle.svelte';
	import { DATE, TIME } from '$lib/consts';
	import { getErrors } from '$lib/form-utils';
	import { parseGoals } from '$lib/goal/utils';
	import type { Task, AnyTask } from '$lib/task/utils';
	import { addMinutes, addMonths, endOfWeek, format, isAfter, parse } from 'date-fns';
	import { createForm } from 'felte';
	import { createEventDispatcher } from 'svelte';
	import Flatpickr from 'svelte-flatpickr';
	import { addTask, editTask } from './service';
	// eslint-disable-next-line import/max-dependencies
	import 'flatpickr/dist/themes/airbnb.css';

	export let userId: string;

	export let task: AnyTask;

	export let categories: Category[];

	export let targetDate: Date | null = null;

	$: isEditing = !!task.id;

	let isEvent = !!('date' in task && task.date);

	let isRecurring = !!('recurringStartAt' in task && task.recurringStartAt);

	let isEventOpen = false;

	let isRecurringOpen = false;

	const dispatch = createEventDispatcher<{ close: null }>();

	const { form, data, errors, setFields, unsetField } = createForm<Task>({
		initialValues: task,
		debounced: {
			validate: (values) => {
				if (values.startTime && values.endTime) {
					if (
						!isAfter(
							parse(values.startTime, TIME, new Date()),
							parse(values.endTime, TIME, new Date()),
						)
					) {
						return { startTime: 'start time should be before end time' };
					}
				}
				return {};
			},
		},
		onSubmit: (values) => {
			const { id, ...data } = values;

			if (id) {
				editTask(id, data, userId);
			} else {
				addTask(data, userId);
			}
			dispatch('close');
		},
	});

	$: formName = `${isEditing ? 'Edit' : 'Add'} ${'startTime' in task ? 'Event' : 'Task'}`;

	$: {
		if (isEvent) {
			unsetField('deadline');
			setFields('duration', '00:15');
			setFields('date', format(new Date(), DATE));
			setFields('startTime', format(new Date(), TIME));
			setFields('endTime', format(addMinutes(new Date(), 15), TIME));
		} else {
			setFields('deadline', format(endOfWeek(new Date()), DATE));
			unsetField('duration');
			unsetField('date');
			unsetField('startTime');
			unsetField('endTime');

			unsetField('recurringDaysOfWeek');
			unsetField('recurringStartAt');
			unsetField('recurringEndAt');
			unsetField('recurringExceptions');
		}
	}

	$: {
		if (isRecurring) {
			setFields('recurringDaysOfWeek', weekDays.slice(1, 6));
			setFields('recurringStartAt', format(new Date(), DATE));
			setFields('recurringEndAt', format(addMonths(new Date(), 1), DATE));
			setFields('recurringExceptions', '');
		} else {
			unsetField('recurringDaysOfWeek');
			unsetField('recurringStartAt');
			unsetField('recurringEndAt');
			unsetField('recurringExceptions');
		}
	}
</script>

<form
	use:form
	on:submit|preventDefault
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

		<Alert type="error" isVisible={!!getErrors($errors)} hasCloseButton={false}>
			{getErrors($errors)}
		</Alert>

		<div class="flex flex-col gap-2 text-sm font-medium text-gray-700">
			<div class="flex gap-3 items-center">
				<Input class="flex-1" placeholder="Name" autocomplete="off" name="name" />

				<label>
					<input
						name="isDone"
						type="checkbox"
						class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
					/>
				</label>
			</div>

			<label class="block text-sm font-medium text-gray-700">
				<textarea
					name="description"
					placeholder="description"
					class="p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
				/>
			</label>

			<Select
				bind:value={$data.category}
				name="category"
				label="Category"
				class="flex items-center"
				labelClass="w-1/5"
				selectClass="flex-1"
			>
				<span slot="placeholder">{$data.category.name}</span>
				{#each categories as category (category)}
					<SelectItem value={category}>{category.name}</SelectItem>
				{/each}
			</Select>

			<SlimCollection ref={`users/${userId}/goals`} parse={parseGoals} let:data={goals}>
				<Select
					bind:value={$data.goal}
					name="goal"
					label="Goal"
					class="flex items-center"
					labelClass="w-1/5"
					selectClass="flex-1"
				>
					<span slot="placeholder">{$data.goal?.name || 'no goal'}</span>
					<SelectItem value={undefined}>no goal</SelectItem>
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
				disabled={isEvent}
			/>

			<div class="bg-white rounded-lg p-2">
				<div class="flex">
					<button
						class="flex-1 text-start"
						type="button"
						on:click={() => {
							if (isEvent) {
								isEventOpen = !isEventOpen;
							} else {
								isEvent = true;
							}
						}}
					>
						Event
					</button>
					<Toggle
						bind:value={isEvent}
						on:change={(e) => {
							isEventOpen = e.detail;
							if (!e.detail) {
								isRecurring = false;
							}
						}}
					/>
				</div>

				{#if isEvent}
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
							<Input class="w-1/2" label="Date" type="date" name="date" required />

							<Input class="w-1/2" label="Duration" type="time" name="duration" required />
						</div>

						<div class="flex gap-3">
							<Input class="w-1/2" label="Start time" type="time" name="startTime" required />

							<Input class="w-1/2" label="End time" type="time" name="endTime" required />
						</div>
					</Transition>
				{/if}
			</div>

			{#if isEvent}
				<div class="bg-white rounded-lg p-2">
					<div class="flex">
						<button
							class="flex-1 text-start"
							type="button"
							on:click={() => {
								if (isRecurring) {
									isRecurringOpen = !isRecurringOpen;
								} else {
									isRecurring = true;
								}
							}}
						>
							Recurring
						</button>
						<Toggle
							bind:value={isRecurring}
							on:change={(e) => {
								if (e.detail === true) {
									isRecurringOpen = true;
								}
							}}
						/>
					</div>

					{#if isRecurring}
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
								/>

								<Input class="w-1/2" label="End at" type="date" name="recurringEndAt" required />
							</div>
							<div>
								<h3 class="block text-sm font-medium text-gray-700 mb-1">Repeat every</h3>
								<DaysCheckbox
									class="flex justify-around"
									name="recurringDaysOfWeek"
									bind:value={$data.recurringDaysOfWeek}
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
									bind:value={$data.recurringExceptions}
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
			<Button color="red" type="button">Delete</Button>
		{:else}
			<div />
		{/if}

		<Button type="submit">
			{#if isEditing} Edit {:else} Add {/if}
		</Button>
	</div>
</form>
