<script lang="ts">
	import type { Routine } from '$lib/routine/utils';

	import Button from '$lib/components/form/button/Button.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import PlusButton from '$lib/components/plus-button/PlusButton.svelte';
	import TypedCollection from '$lib/components/typed-collection/TypedCollection.svelte';
	import WeekListSelector from '$lib/components/week-list-selector/WeekListSelector.svelte';
	import { DATE, DbPaTH } from '$lib/consts';
	import { title } from '$lib/utils';
	import { addDays, format, startOfWeek } from 'date-fns';
	import { Calendar1, Plus } from 'lucide-svelte';
	import { SignedIn } from 'sveltefire';

	import RoutineForm from './routine-form/RoutineForm.svelte';
	import { buildEmptyRoutine } from './routine-form/service';
	import RoutineRow from './routine-row/RoutineRow.svelte';

	let weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });

	$: dates = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

	let editingRoutine: Routine = buildEmptyRoutine();

	let showForm = false;

	let selectedDate: Date = new Date();

	let routinesType: Routine;

	title.set('Routine');

	$: dateString = format(selectedDate, DATE);
</script>

<div class="py-4">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-full flex-col">
			<SignedIn let:user>
				<TypedCollection
					let:data={routines}
					ref={`${DbPaTH.USERS}/${user.uid}/${DbPaTH.ROUTINES}`}
					type={routinesType}
				>
					<WeekListSelector bind:selectedDate {dates} {routines} />

					{#each routines as routine (routine.id)}
						<RoutineRow
							on:edit={(e) => {
								showForm = true;
								editingRoutine = e.detail;
							}}
							{routine}
							selectedDate={dateString}
							userId={user.uid}
						/>
					{/each}

					{#if routines.length === 0}
						<div class="flex flex-1 items-center justify-center text-center">
							<div class="w-2/3 rounded-lg border-2 border-dashed p-6">
								<Calendar1 aria-hidden="true" class="mx-auto h-12 w-12 text-gray-400" />

								<h3 class="mt-2 text-sm font-semibold text-gray-900">No routine</h3>
								<p class="mt-1 text-sm text-gray-500">Get started by creating a new routine.</p>
								<div class="mt-6">
									<Button
										class="flex items-center"
										on:click={() => {
											showForm = true;
											editingRoutine = buildEmptyRoutine();
										}}
									>
										<Plus class="h-5 w-auto" />
										New Routine
									</Button>
								</div>
							</div>
						</div>
					{/if}

					<Modal on:close={() => (showForm = false)} show={showForm}>
						<RoutineForm
							on:close={() => (showForm = false)}
							routine={editingRoutine}
							userId={user.uid}
						/>
					</Modal>
				</TypedCollection>
			</SignedIn>

			<PlusButton
				on:click={() => {
					showForm = true;
					editingRoutine = buildEmptyRoutine();
				}}
			/>
		</div>
	</div>
</div>
