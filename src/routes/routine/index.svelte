<!--routify:meta reset="dashboard+" -->
<script lang="ts">
	import { addDays, startOfWeek } from 'date-fns';
	import { Calendar1, Plus } from 'lucide-svelte';

	import Button from '$lib/components/form/button/Button.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import WeekChanger from '$lib/components/week-changer/WeekChanger.svelte';
	import DBRoutines from '$lib/routine/DBRoutines.svelte';
	import { title } from '$lib/utils.svelte.js';

	import RoutineForm from './routine-form/RoutineForm.svelte';
	import { buildEmptyRoutine } from './routine-form/service';
	import RoutineRows from './routine-rows/RoutineRows.svelte';
	import Streak from './streak/Streak.svelte';
	import WeekListSelector from './week-list-selector/WeekListSelector.svelte';

	let weekStart = $state(startOfWeek(new Date(), { weekStartsOn: 1 }));

	const dates = $derived(Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)));

	let editingRoutine = $state(buildEmptyRoutine());

	let showForm = $state(false);

	let selectedDate: Date = $state(new Date());

	title.value = 'Routine';
</script>

<DBRoutines>
	{#snippet data(routines, userId)}
		<div class="mx-auto max-w-7xl p-4 sm:px-6 lg:px-8">
			<div class="flex h-full w-full flex-col gap-5">
				<div class="flex items-center justify-between">
					<h1 class="hidden text-2xl font-bold text-gray-900 md:block">{title.value}</h1>
					<div
						class="flex flex-grow items-center justify-between gap-5 md:flex-grow-0 md:justify-start"
					>
						<Streak {routines} />
						<div class="flex gap-5">
							<WeekChanger bind:selectedDate bind:weekStart />

							<div class="h-7 border-r border-gray-300"></div>

							<Button
								onclick={() => {
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

				<RoutineRows
					edit={(routine) => {
						showForm = true;
						editingRoutine = routine;
					}}
					{routines}
					{selectedDate}
					{userId}
				/>

				{#if routines.length === 0}
					<div class="flex flex-1 items-center justify-center text-center">
						<div class="w-2/3 rounded-lg border-2 border-dashed p-6">
							<Calendar1 aria-hidden="true" class="mx-auto h-12 w-12 text-gray-400" />

							<h3 class="mt-2 text-sm font-semibold text-gray-900">No routine</h3>
							<p class="mt-1 text-sm text-gray-500">Get started by creating a new routine.</p>
							<div class="mt-6">
								<Button
									class="flex items-center"
									onclick={() => {
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

				<Modal bind:isOpen={showForm}>
					<RoutineForm close={() => (showForm = false)} routine={editingRoutine} {userId} />
				</Modal>
			</div>
		</div>
	{/snippet}
</DBRoutines>
