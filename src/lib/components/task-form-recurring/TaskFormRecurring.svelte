<script lang="ts">
	import type { TaskIn } from '$lib/components/task-form/service.js';

	import DaysCheckbox from '$lib/components/days-checkbox/DaysCheckbox.svelte';
	import Input from '$lib/components/input/Input.svelte';
	import Flatpickr from 'svelte-flatpickr'; // TODO check later how I should import a precompiled component https://github.com/sveltejs/svelte/issues/604

	export let taskIn: TaskIn;
</script>

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
	<label class="mb-1 block text-sm text-gray-700" for="recurringExceptions"> Exclude on </label>
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
