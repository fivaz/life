<script lang="ts">
	import { LInput, LText } from '@life/shared';
	import { fade, slide } from 'svelte/transition';

	import MultiDatePicker from '$lib/components/form/multi-date-picker/MultiDatePicker.svelte';
	import Select from '$lib/components/form/select/Select.svelte';
	import SelectItem from '$lib/components/form/select/select-item/SelectItem.svelte';
	import Toggle from '$lib/components/form/toggle/Toggle.svelte';
	import { frequencies } from '$lib/task/task.model';
	import { taskIn } from '$lib/task/task-form/service.svelte';

	import DaysCheckbox from './days-checkbox/DaysCheckbox.svelte';

	let isRecurringOpen = $state(false);

	function togglePanel() {
		if (!taskIn.value.isRecurring) {
			taskIn.value.isRecurring = true;
		}
		isRecurringOpen = !isRecurringOpen;
	}
</script>

<div class="rounded-lg border border-gray-300 p-2 dark:border-gray-700">
	<div class="flex">
		<button class="flex-1 text-start" onclick={togglePanel} type="button">
			<LText>Recurring</LText>
		</button>

		<Toggle bind:value={taskIn.value.isRecurring} />
	</div>

	{#if taskIn.value.isRecurring && isRecurringOpen}
		<div transition:slide>
			<div class="flex flex-col gap-3 pt-2">
				<!--frequency-->
				<Select label="Frequency" bind:value={taskIn.value.recurringFrequency}>
					{#snippet placeholder()}
						<div class="flex items-center gap-3">{taskIn.value.recurringFrequency}</div>
					{/snippet}
					{#each frequencies as frequency (frequency)}
						<SelectItem value={frequency}>
							<div class="flex items-center gap-3">{frequency}</div>
						</SelectItem>
					{/each}
				</Select>

				<!--days of week-->
				{#if taskIn.value.recurringFrequency === 'daily'}
					<div transition:fade>
						<DaysCheckbox />
					</div>
				{/if}

				<!--end at-->
				<LInput
					inputClass="w-full"
					label="End at"
					type="date"
					bind:value={taskIn.value.recurringEndAt}
				/>

				<!--exceptions-->
				<MultiDatePicker label="Exceptions on" bind:value={taskIn.value.recurringExceptions} />
			</div>
		</div>
	{/if}
</div>
