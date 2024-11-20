<script lang="ts">
	import { Calendar1, Plus } from 'lucide-svelte';

	import Button from '$lib/components/form/button/Button.svelte';

	import { getOpenRoutineForm } from '../routine-rows/service';

	const openForm = getOpenRoutineForm();
</script>

<div class="flex flex-1 items-center justify-center text-center">
	<div class="w-2/3 rounded-lg border-2 border-dashed p-6">
		<Calendar1 class="mx-auto h-12 w-12 text-gray-400" aria-hidden="true" />

		<h3 class="mt-2 text-sm font-semibold text-gray-900">No routine</h3>
		<p class="mt-1 text-sm text-gray-500">Get started by creating a new routine.</p>
		<div class="mt-6">
			<Button class="flex items-center" onclick={() => openForm()}>
				<Plus class="h-5 w-auto" />
				New Routine
			</Button>
		</div>
	</div>
</div>
