<script lang="ts">
	import type { Category } from '$lib/category/utils';
	import type { Goal } from '$lib/goal/utils';
	import type { AnyTask } from '$lib/task/utils';

	import Alert from '$lib/components/alert/Alert.svelte';
	import Button from '$lib/components/button/Button.svelte';
	import ConfirmButton from '$lib/components/confirm-button/ConfirmButton.svelte';
	import DaysCheckbox from '$lib/components/days-checkbox/DaysCheckbox.svelte';
	import Input from '$lib/components/input/Input.svelte';
	import Select from '$lib/components/select/Select.svelte';
	import SelectItem from '$lib/components/select/select-item/SelectItem.svelte';
	import {
		addTask,
		convertToTaskIn,
		editTaskWithPrompt,
		getDuration,
		getEndTime,
		removeTask,
		storeImage,
	} from '$lib/components/task-form/service';
	import Toggle from '$lib/components/toggle/Toggle.svelte';
	import TypedCollection from '$lib/components/typed-collection/TypedCollection.svelte';
	import { convertToAnyTask, hasErrors } from '$lib/task/utils';
	import {
		Disclosure,
		DisclosureButton,
		DisclosurePanel,
		Transition,
	} from '@rgossiaux/svelte-headlessui';
	import { ChevronRight, Photo, XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import 'flatpickr/dist/themes/airbnb.css';
	import { createEventDispatcher } from 'svelte'; // TODO check later how I should import a precompiled component https://github.com/sveltejs/svelte/issues/604
	import Modal from '$lib/components/modal/Modal.svelte';
	import { storage } from '$lib/firebase';
	import { FirebaseError } from 'firebase/app';
	import { getDownloadURL, ref } from 'firebase/storage';
	import Flatpickr from 'svelte-flatpickr';

	import type { TaskIn } from './service';

	// TODO add all things related to task like TaskForm in a task folder
	export let userId: string;

	export let task: AnyTask;

	export let categories: Category[];

	export let targetDate: string | undefined = undefined;

	let taskIn: TaskIn = convertToTaskIn(task);

	let wasRecurring = taskIn.isRecurring;

	let isEventOpen = true;

	let isRecurringOpen = false;

	const dispatch = createEventDispatcher<{ close: null }>();

	let errorMessage = '';

	let file: File | null = null;

	let image: null | string = null;

	let isImageOpen = false;

	$: isEditing = !!task.id;

	$: formName = `${isEditing ? 'Edit' : 'Add'} ${'startTime' in task ? 'Event' : 'Task'}`;

	async function getImage() {
		if (!task.id) {
			return;
		}

		const imageRef = ref(storage, `users/${userId}/tasks/${task.id}`);
		try {
			const foundImage = await getDownloadURL(imageRef);
			if (foundImage) {
				image = foundImage;
			}
		} catch (error) {
			if (error instanceof FirebaseError && error.code !== 'storage/object-not-found') {
				return console.log('error', error);
			}
		}
	}

	getImage();

	async function onSubmit() {
		if (hasErrors(taskIn, errorMessage)) {
			return;
		}

		const { id, ...data } = convertToAnyTask(taskIn);
		let eventId = id;

		if (id) {
			void editTaskWithPrompt(id, data, userId, targetDate, wasRecurring);
		} else {
			eventId = await addTask(data, userId);
		}
		if (file) {
			void storeImage(userId, eventId, file);
		}

		dispatch('close');
	}

	function handleChange(event: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		if (event.currentTarget.files) {
			[file] = event.currentTarget.files;
			image = URL.createObjectURL(file);
		}
	}

	let goalType: Goal;
</script>

<form
	class="w-[355px] shadow rounded-md overflow-hidden relative text-start font-medium"
	on:submit|preventDefault={onSubmit}
>
	<div class="bg-neutral-100 px-4 py-5 sm:p-4">
		<div class="flex justify-between items-center pb-2">
			<h2 class="text-lg text-gray-900">{formName}</h2>
			<button
				class="pl-2 inline-flex rounded-md p-1.5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-gray-50"
				on:click={() => dispatch('close')}
				type="button"
			>
				<span class="sr-only">Dismiss</span>
				<Icon aria-hidden="true" class="h-5 w-5" src={XMark} />
			</button>
		</div>

		<Alert hasCloseButton={false} isVisible={!!errorMessage} type="error">
			{errorMessage}
		</Alert>

		<div class="flex flex-col gap-2 text-sm text-gray-700">
			<div class="flex gap-3 items-center">
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

			<Disclosure class="bg-white rounded-lg p-2" let:open>
				<DisclosureButton class="flex justify-between w-full">
					<span>Description</span>
					<Icon class="w-5 h-5 {open ? 'rotate-90 transform' : ''}" src={ChevronRight} />
				</DisclosureButton>
				<Transition
					class="transition-all duration-500 overflow-hidden"
					enterFrom="transform opacity-0 max-h-0"
					enterTo="transform opacity-100 max-h-36"
					leaveFrom="transform opacity-100 max-h-36"
					leaveTo="transform opacity-0 max-h-0"
				>
					<DisclosurePanel class="text-gray-500 pt-2 flex flex-col gap-2">
						<div class="flex flex-col gap-2 w-full">
							<div class="h-24 flex items-center justify-center overflow-hidden">
								{#if image}
									<button on:click={() => (isImageOpen = true)} type="button">
										<img alt="event description" src={image} />
									</button>
									<Modal on:close={() => (isImageOpen = false)} show={isImageOpen}>
										<div class="bg-white p-2 rounded-lg shadow">
											<img alt="event description" src={image} />
										</div>
									</Modal>
								{:else}
									<Icon class="h-10 w-10 text-indigo-700" src={Photo} />
								{/if}
							</div>

							<label
								class="w-full focus-visible:outline-indigo-600 bg-indigo-600 hover:bg-indigo-500 inline-flex gap-2 justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
							>
								<input
									accept="image/*"
									class="hidden"
									name="avatar"
									on:change={handleChange}
									type="file"
								/>
								{#if image}Change image{:else}Add image{/if}
							</label>
						</div>

						<label class="block text-sm text-gray-700">
							<textarea
								bind:value={taskIn.description}
								class="p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
								name="description"
								placeholder="description"
							/>
						</label>
					</DisclosurePanel>
				</Transition>
			</Disclosure>

			<Select
				bind:value={taskIn.category}
				class="flex items-center"
				label="Category"
				labelClass="w-1/5"
				name="category"
				selectClass="flex-1"
			>
				<span slot="placeholder">{taskIn.category.name}</span>
				{#each categories as category (category)}
					<SelectItem value={category}>{category.name}</SelectItem>
				{/each}
			</Select>

			<TypedCollection let:data={goals} ref={`users/${userId}/goals`} type={goalType}>
				<Select
					bind:value={taskIn.goal}
					class="flex items-center"
					label="Goal"
					labelClass="w-1/5"
					name="goal"
					selectClass="flex-1"
				>
					<span slot="placeholder">{taskIn.goal?.name || 'no goal'}</span>
					<SelectItem value={null}>no goal</SelectItem>
					{#each goals as goal (goal)}
						<SelectItem value={goal}>{goal.name}</SelectItem>
					{/each}
				</Select>
			</TypedCollection>

			<Input
				bind:value={taskIn.deadline}
				class="flex items-center"
				disabled={taskIn.isEvent}
				inputClass="flex-1"
				label="Deadline"
				labelClass="w-1/5"
				name="deadline"
				type="date"
			/>

			<div class="bg-white rounded-lg p-2">
				<div class="flex">
					<button
						class="flex-1 text-start"
						on:click={() => {
							if (taskIn.isEvent) {
								isEventOpen = !isEventOpen;
							} else {
								taskIn.isEvent = true;
							}
						}}
						type="button"
					>
						Event
					</button>
					<Toggle bind:value={taskIn.isEvent} on:change={(e) => (isEventOpen = e.detail)} />
				</div>

				{#if taskIn.isEvent}
					<Transition
						class="transition-all duration-500 overflow-hidden"
						enterFrom="transform opacity-0 max-h-0"
						enterTo="transform opacity-100 max-h-36"
						leaveFrom="transform opacity-100 max-h-36"
						leaveTo="transform opacity-0 max-h-0"
						show={isEventOpen}
						unmount={false}
					>
						<div class="flex gap-3 pt-2 overflow-hidden">
							<Input
								bind:value={taskIn.date}
								class="w-1/2"
								label="Date"
								name="date"
								required
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

						<div class="flex gap-3">
							<Input
								bind:value={taskIn.startTime}
								class="w-1/2"
								label="Start time"
								name="startTime"
								on:input={(e) => (taskIn.endTime = getEndTime(e.detail, taskIn.duration))}
								required
								type="time"
							/>

							<Input
								bind:value={taskIn.endTime}
								class="w-1/2"
								label="End time"
								name="endTime"
								on:input={(e) => (taskIn.duration = getDuration(taskIn.startTime, e.detail))}
								required
								type="time"
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
							on:click={() => {
								if (taskIn.isRecurring) {
									isRecurringOpen = !isRecurringOpen;
								} else {
									taskIn.isRecurring = true;
								}
							}}
							type="button"
						>
							Recurring
						</button>
						<Toggle
							bind:value={taskIn.isRecurring}
							on:change={(e) => {
								if (e.detail) {
									isRecurringOpen = true;
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
							show={isRecurringOpen}
							unmount={false}
						>
							<div class="flex gap-3 pt-2">
								<Input
									bind:value={taskIn.recurringStartAt}
									class="w-1/2"
									label="Start at"
									name="recurringStartAt"
									required
									type="date"
								/>

								<Input
									bind:value={taskIn.recurringEndAt}
									class="w-1/2"
									label="End at"
									name="recurringEndAt"
									required
									type="date"
								/>
							</div>
							<div>
								<h3 class="block text-sm text-gray-700 mb-1">Repeat every</h3>
								<DaysCheckbox
									bind:value={taskIn.recurringDaysOfWeek}
									class="flex justify-around"
									name="recurringDaysOfWeek"
								/>
							</div>

							<div>
								<label class="block text-sm text-gray-700 mb-1" for="recurringExceptions">
									Exclude on
								</label>
								<Flatpickr
									bind:value={taskIn.recurringExceptions}
									class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									id="recurringExceptions"
									name="recurringExceptions"
									options={{
										dateFormat: 'Y-m-d',
										mode: 'multiple',
									}}
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
			<ConfirmButton
				color="red"
				on:confirm={() => removeTask(task, userId, targetDate, dispatch)}
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
