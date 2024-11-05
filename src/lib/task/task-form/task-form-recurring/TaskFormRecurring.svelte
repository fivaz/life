<script lang="ts">
	import Input from '$lib/components/form/input/Input.svelte';
	import Toggle from '$lib/components/form/toggle/Toggle.svelte';
	import Flatpickr from 'svelte-flatpickr';

	import DaysCheckbox from './days-checkbox/DaysCheckbox.svelte';
	import type { TaskIn } from '$lib/task/task-in-utils';
	import { slide, fade } from 'svelte/transition';

	import 'flatpickr/dist/themes/airbnb.css';
	import Select from '$lib/components/form/select/Select.svelte';
	import SelectItem from '$lib/components/form/select/select-item/SelectItem.svelte';
	import { frequencies } from '$lib/task/utils';

	interface Props {
		taskIn: TaskIn;
	}

	let { taskIn = $bindable() }: Props = $props();

	let isRecurringOpen = $state(false);
</script>

<div class="rounded-lg bg-white p-2">
	<div class="flex">
		<button
			class="flex-1 text-start"
			onclick={() => {
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
			onchange={(value) => {
				if (value) {
					isRecurringOpen = true;
				}
			}}
		/>
	</div>

	{#if taskIn.isRecurring}
		{#if isRecurringOpen}
			<div transition:slide>
				<div class="flex flex-col gap-3 pt-2">
					<Select bind:value={taskIn.recurringFrequency} label="Frequency">
						{#snippet placeholder()}
							<div class="flex items-center gap-3">{taskIn.recurringFrequency}</div>
						{/snippet}
						{#each frequencies as frequency (frequency)}
							<SelectItem value={frequency}>
								<div class="flex items-center gap-3">{frequency}</div>
							</SelectItem>
						{/each}
					</Select>

					{#if taskIn.recurringFrequency === 'daily'}
						<div transition:fade>
							<h3 class="text-sm text-gray-700">Repeat every</h3>
							<DaysCheckbox bind:value={taskIn.recurringDaysOfWeek} class="flex justify-around" />
						</div>
					{/if}

					<Input bind:value={taskIn.recurringEndAt} label="End at" required type="date" />

					<div>
						<label class="mb-1 block text-sm text-gray-700">
							Exceptions
							<Flatpickr
								bind:value={taskIn.recurringExceptions}
								class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
								id="recurringExceptions"
								options={{
									dateFormat: 'Y-m-d',
									mode: 'multiple',
								}}
							/>
						</label>
					</div>
				</div>
			</div>
		{/if}
	{/if}
</div>
