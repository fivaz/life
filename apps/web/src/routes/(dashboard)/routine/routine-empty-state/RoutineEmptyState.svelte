<script lang="ts">
	import { Calendar1, Plus } from '@lucide/svelte';

	import type { Routine } from '$lib/routine/routine.model';
	import { buildEmptyRoutine } from '$lib/routine/routine.model';

	import RoutineFormButton from '../routine-form-button/RoutineFormButton.svelte';

	let newRoutine = $state<Routine>(buildEmptyRoutine());
</script>

<div class="flex flex-1 items-center justify-center text-center">
	<div class="w-2/3 rounded-lg border-2 border-dashed border-gray-200 p-6 dark:border-gray-700">
		<Calendar1 class="mx-auto size-12 text-gray-400" aria-hidden="true" />

		<h3 class="mt-2 text-sm font-semibold text-gray-900 dark:text-gray-300">No routine</h3>
		<p class="mt-1 text-sm text-gray-500">Get started by creating a new routine.</p>
		<div class="mt-6 flex justify-center">
			<RoutineFormButton routine={newRoutine}>
				<Plus class="size-4" />
				<span class="hidden lg:block">New Routine</span>
			</RoutineFormButton>
		</div>
	</div>
</div>
