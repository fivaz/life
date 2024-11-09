<script lang="ts">
	import Input from '$lib/components/form/input/Input.svelte';
	import Toggle from '$lib/components/form/toggle/Toggle.svelte';
	import flatpickr from 'flatpickr';

	import DaysCheckbox from './days-checkbox/DaysCheckbox.svelte';
	import { slide, fade } from 'svelte/transition';

	import 'flatpickr/dist/themes/airbnb.css';
	import Select from '$lib/components/form/select/Select.svelte';
	import SelectItem from '$lib/components/form/select/select-item/SelectItem.svelte';
	import { frequencies } from '$lib/task/utils';
	import { taskIn } from '$lib/task/task-form/service.svelte';
	
let isRecurringOpen = $state(false);

	let ref = $state<HTMLInputElement | null>(null);

	$effect(() => {
		if (ref) {
			flatpickr(ref, {
				dateFormat: 'Y-m-d',
				mode: 'multiple',
				onValueUpdate: (_, datesStr) => {
					taskIn.value.recurringExceptions = datesStr.split(',');
				},
			});
		}
	});

	function togglePanel() {
		if (!taskIn.value.isRecurring) {
			taskIn.value.isRecurring = true;
		}
		isRecurringOpen = !isRecurringOpen;
	}
</script>

<div class="rounded-lg bg-white p-2">
	<div class="flex">
		<button class="flex-1 text-start" onclick={togglePanel} type="button"> Recurring </button>

		<Toggle bind:value={taskIn.value.isRecurring} />
	</div>

	{#if taskIn.value.isRecurring && isRecurringOpen}
		<div transition:slide>
			<div class="flex flex-col gap-3 pt-2">
				<Select bind:value={taskIn.value.recurringFrequency} label="Frequency">
					{#snippet placeholder()}
						<div class="flex items-center gap-3">{taskIn.value.recurringFrequency}</div>
					{/snippet}
					{#each frequencies as frequency (frequency)}
						<SelectItem value={frequency}>
							<div class="flex items-center gap-3">{frequency}</div>
						</SelectItem>
					{/each}
				</Select>

				{#if taskIn.value.recurringFrequency === 'daily'}
					<div transition:fade>
						<h3 class="text-sm text-gray-700">Repeat every</h3>
						<DaysCheckbox />
					</div>
				{/if}

				<Input bind:value={taskIn.value.recurringEndAt} label="End at" type="date" />

				<div>
					<label class="mb-1 block text-sm text-gray-700">
						Exceptions on
						<input
							class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
							bind:this={ref}
							value={taskIn.value.recurringExceptions}
						/>
					</label>
				</div>
			</div>
		</div>
	{/if}
</div>
