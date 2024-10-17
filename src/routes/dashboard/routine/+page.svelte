<script lang="ts">
	import type { Routine } from '$lib/routine/utils';

	import Button from '$lib/components/form/button/Button.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import Streak from '$lib/components/streak/Streak.svelte';
	import TypedCollection from '$lib/components/typed-collection/TypedCollection.svelte';
	import WeekChanger from '$lib/components/week-changer/WeekChanger.svelte';
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

	function orderRoutines(routines: Routine[]) {
		return routines.sort((a, b) => (a.order || Infinity) - (b.order || Infinity));
	}
</script>

<div class="mx-auto max-w-7xl p-4 sm:px-6 lg:px-8">
	<div class="flex h-full w-full flex-col gap-5">
		<SignedIn let:user>
			<TypedCollection
				let:data={routines}
				ref={`${DbPaTH.USERS}/${user.uid}/${DbPaTH.ROUTINES}`}
				type={routinesType}
			>
				<div class="flex items-center justify-between">
					<h1 class="hidden text-2xl font-bold text-gray-900 md:block">{$title}</h1>
					<div
						class="flex flex-grow items-center justify-between gap-5 md:flex-grow-0 md:justify-start"
					>
						<Streak {routines} />
						<div class="flex gap-5">
							<WeekChanger bind:selectedDate bind:weekStart />

							<div class="h-7 border-r border-gray-300" />

							<Button
								on:click={() => {
									showForm = true;
									editingRoutine = buildEmptyRoutine();
								}}
							>
								<Plus class="h-4 w-auto" />
								<span class="hidden md:block">New Routine</span>
							</Button>
						</div>
					</div>
				</div>

				<WeekListSelector bind:selectedDate {dates} {routines} />

				<ul class="flex flex-col gap-1">
					{#each orderRoutines(routines) as routine (routine.id)}
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
				</ul>

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
						routinesLength={routines.length}
						userId={user.uid}
					/>
				</Modal>
			</TypedCollection>
		</SignedIn>
	</div>
</div>
