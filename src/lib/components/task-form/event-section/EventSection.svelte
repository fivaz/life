<script lang="ts">
	import DaysCheckbox from '$lib/components/days-checkbox/DaysCheckbox.svelte';
	import Input from '$lib/components/input/Input.svelte';
	import { getDuration, getEndTime } from '$lib/components/task-form/service';
	import type { TaskIn } from '$lib/components/task-form/service';
	import Toggle from '$lib/components/toggle/Toggle.svelte';
	import Flatpickr from 'svelte-flatpickr';
	import { slide } from 'svelte/transition';

	export let task: TaskIn;

	let isEventOpen: boolean = false;

	let isRecurringOpen: boolean = false;
</script>

<Input
	type="date"
	name="deadline"
	label="Deadline"
	class="flex items-center"
	labelClass="w-1/5"
	inputClass="flex-1"
	bind:value={task.deadline}
	disabled={task.isEvent}
/>

<div class="bg-white rounded-lg p-2">
	<div class="flex">
		<button class="flex-1 text-start" type="button" on:click={() => (isEventOpen = !isEventOpen)}>
			Event
		</button>
		<Toggle
			name="isEvent"
			bind:value={task.isEvent}
			on:change={(e) => {
				if (e.detail === true) {
					isEventOpen = true;
				}
			}}
		/>
	</div>

	{#if isEventOpen}
		<div transition:slide>
			<div class="flex gap-3 pt-2">
				<Input class="w-1/2" label="Date" type="date" name="date" bind:value={task.date} required />

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
		</div>
	{/if}
</div>

{#if task.isEvent}
	<div class="bg-white rounded-lg p-2">
		<div class="flex">
			<button
				class="flex-1 text-start"
				type="button"
				on:click={() => (isRecurringOpen = !isRecurringOpen)}
			>
				Recurring
			</button>
			<Toggle
				name="isEvent"
				bind:value={task.isRecurring}
				on:change={(e) => {
					if (e.detail === true) {
						isRecurringOpen = true;
					}
				}}
			/>
		</div>

		{#if isRecurringOpen}
			<div transition:slide>
				<div class="flex gap-3 pt-2">
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
			</div>
		{/if}
	</div>
{/if}
