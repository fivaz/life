<script lang="ts">
	import Input from '$lib/components/form/input/Input.svelte';
	import Toggle from '$lib/components/form/toggle/Toggle.svelte';
	import Flatpickr from 'svelte-flatpickr';

	import DaysCheckbox from './days-checkbox/DaysCheckbox.svelte'; // TODO check later how I should import a precompiled component https://github.com/sveltejs/svelte/issues/604
	import type { TaskIn } from '$lib/task/task-in-utils';

	import 'flatpickr/dist/themes/airbnb.css';

	export let taskIn: TaskIn;

	let isRecurringOpen = false;
</script>

<div class="rounded-lg bg-white p-2">
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
		<div class={isRecurringOpen ? 'block' : 'hidden'}>
			<!--		<Transition-->
			<!--			class="overflow-hidden transition-all duration-500"-->
			<!--			enterFrom="transform opacity-0 max-h-0"-->
			<!--			enterTo="transform opacity-100 max-h-36"-->
			<!--			leaveFrom="transform opacity-100 max-h-36"-->
			<!--			leaveTo="transform opacity-0 max-h-0"-->
			<!--			show={isRecurringOpen}-->
			<!--			unmount={false}-->
			<!--		>-->
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
				<h3 class="mb-1 block text-sm text-gray-700">Repeat every</h3>
				<DaysCheckbox
					bind:value={taskIn.recurringDaysOfWeek}
					class="flex justify-around"
					name="recurringDaysOfWeek"
				/>
			</div>

			<div>
				<label class="mb-1 block text-sm text-gray-700" for="recurringExceptions">
					Exclude on
				</label>
				<Flatpickr
					bind:value={taskIn.recurringExceptions}
					class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
					id="recurringExceptions"
					name="recurringExceptions"
					options={{
						dateFormat: 'Y-m-d',
						mode: 'multiple',
					}}
				/>
			</div>
			<!--		</Transition>-->
		</div>
	{/if}
</div>
