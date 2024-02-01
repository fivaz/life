<script lang="ts">
	import { validator } from '@felte/validator-yup';
	import { XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { applyAction } from '$app/forms';
	import type { Category } from '$lib/category/utils';
	import Alert from '$lib/components/alert/Alert.svelte';
	import Button from '$lib/components/button/Button.svelte';
	import { createModal } from '$lib/components/dialog/service';
	import Input from '$lib/components/input/Input.svelte';
	import SelectItem from '$lib/components/select/select-item/SelectItem.svelte';
	import Select from '$lib/components/select/Select.svelte';
	import SlimCollection from '$lib/components/slim-collection/SlimCollection.svelte';
	import EventSection from '$lib/components/task-form/event-section/EventSection.svelte';
	import { UnknownError } from '$lib/consts';
	import { parseGoals } from '$lib/goal/utils';
	import { updateTasks } from '$lib/task/store';
	import type { Task } from '$lib/task/utils';
	import type { SubSubmitFunction } from '$lib/types-utils';
	import { createForm } from 'felte';
	import { createEventDispatcher } from 'svelte';
	import { object, string } from 'yup';
	import { addTask, deleteTask, editTask, formatDates, isEventsDateInverted } from './service';

	export let userId: string;

	export let task: Task;

	export let categories: Category[];

	export let targetDate: Date | null = null;

	$: isEditing = !!task.id;

	let error = '';

	$: {
		if (isEventsDateInverted(task)) {
			error = 'start date should be before end date';
		} else if (categories.length === 0) {
			error = 'create a category first';
		} else {
			error = '';
		}
	}

	$: formName = `${isEditing ? 'Edit' : 'Add'} ${task.deadline ? 'Event' : 'Task'}`;

	const dispatch = createEventDispatcher<{ close: null }>();

	const schema = object({});

	const { form, data, errors } = createForm({
		extend: [validator({ schema })],
		validateSchema: schema,
		initialValues: task,
		onSubmit: (values) => {
			const slim = {
				id: values.id,
				name: values.name,
				isDone: values.isDone,
				category: values.category,
				...(values.description ? { description: values.description } : {}),
				...(values.deadline ? { deadline: values.deadline } : {}),
				...(values.date ? { date: values.date } : {}),
				...(values.startTime ? { startTime: values.startTime } : {}),
				...(values.endTime ? { endTime: values.endTime } : {}),
				...(values.duration ? { duration: values.duration } : {}),
				...(values.recurringExceptions ? { recurringExceptions: values.recurringExceptions } : {}),
				...(values.recurringDaysOfWeek ? { recurringDaysOfWeek: values.recurringDaysOfWeek } : {}),
				...(values.recurringStartAt ? { recurringStartAt: values.recurringStartAt } : {}),
				...(values.recurringEndAt ? { recurringEndAt: values.recurringEndAt } : {}),
				...(values.goal ? { goal: values.goal } : {}),
			};

			const { id, ...data } = slim;

			console.log(data);

			if (id) {
				console.log('edit');
				editTask(id, data, userId);
			} else {
				console.log('add');
				addTask(data, userId).then((xxx) => console.log(xxx));
			}
			dispatch('close');
		},
	});

	$: parsedErrors = Object.values($errors)
		.filter((value) => value)
		.join(', ');
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

		<Alert type="error" isVisible={!!parsedErrors} hasCloseButton={false}>{parsedErrors}</Alert>

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
					{#each goals as goal (goal)}
						<SelectItem value={goal}>{goal.name}</SelectItem>
					{/each}
				</Select>
			</SlimCollection>

			<EventSection {task} />
		</div>
	</div>

	<div class="flex justify-between px-4 py-3 bg-gray-50 text-right sm:px-6">
		{#if isEditing}
			<Button
				color="red"
				on:click={async () => {
					const result = await createModal({ title: 'Are you sure?' });
					if (result) {
						void deleteTask(task.id, userId);
						dispatch('close');
					}
				}}
			>
				Delete
			</Button>
		{:else}
			<div />
		{/if}

		<Button disabled={error} type="submit">
			{#if isEditing} Edit {:else} Add {/if}
		</Button>
	</div>
</form>
