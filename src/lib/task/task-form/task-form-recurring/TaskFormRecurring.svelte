<script lang="ts">
	import { fade, slide } from 'svelte/transition';

	import Input from '$lib/components/form/input/Input.svelte';
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

<div class="rounded-lg bg-white p-2">
	<div class="flex">
		<button class="flex-1 text-start" onclick={togglePanel} type="button"> Recurring </button>

		<Toggle bind:value={taskIn.value.isRecurring} />
	</div>

	{#if taskIn.value.isRecurring && isRecurringOpen}
		<div transition:slide>
			<div class="flex flex-col gap-3 pt-2">
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

				{#if taskIn.value.recurringFrequency === 'daily'}
					<div transition:fade>
						<h3 class="text-sm text-gray-700">Repeat every</h3>
						<DaysCheckbox />
					</div>
				{/if}

				<Input label="End at" type="date" bind:value={taskIn.value.recurringEndAt} />

				<MultiDatePicker label="Exceptions on" bind:value={taskIn.value.recurringExceptions} />
			</div>
		</div>
	{/if}
</div>
