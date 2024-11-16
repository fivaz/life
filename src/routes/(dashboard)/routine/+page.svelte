<script lang="ts">
	import { format, startOfWeek } from 'date-fns';
	import { Calendar1, Plus } from 'lucide-svelte';

	import Button from '$lib/components/form/button/Button.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import WeekChanger from '$lib/components/week-changer/WeekChanger.svelte';
	import { DATE } from '$lib/consts';
	import DBRoutines from '$lib/routine/DBRoutines.svelte';
	import { buildEmptyRoutine, type Routine } from '$lib/routine/routine.model';
	import { title } from '$lib/utils.svelte';

	import RoutineForm from './routine-form/RoutineForm.svelte';
	import RoutineRows from './routine-rows/RoutineRows.svelte';
	import Streak from './streak/Streak.svelte';
	import WeekListSelector from './week-list-selector/WeekListSelector.svelte';

	let _weekStart = $state<Date>(startOfWeek(new Date(), { weekStartsOn: 1 }));

	let previousWeekStart = $state<Date>(startOfWeek(new Date(), { weekStartsOn: 1 }));

	const weekStart = {
		get value() {
			return _weekStart;
		},
		set value(value) {
			previousWeekStart = _weekStart;
			_weekStart = value;
		},
	};

	let editingRoutine = $state<Routine>(buildEmptyRoutine());

	let showForm = $state<boolean>(false);

	let selectedDate: Date = $state<Date>(new Date());

	title.value = 'Routine';
</script>

<DBRoutines>
	{#snippet data(routines, userId)}
		<div class="mx-auto max-w-7xl p-4 sm:px-6 lg:px-8">
			<div class="flex h-full w-full flex-col gap-5">
				<!--button panel-->
				<div class="flex items-center justify-between">
					<h1 class="hidden text-2xl font-bold text-gray-900 md:block">{title.value}</h1>
					<div
						class="flex flex-grow items-center justify-between gap-5 md:flex-grow-0 md:justify-start"
					>
						<Streak {routines} />
						<div>
							<h1 class="flex items-center gap-2 text-base font-semibold leading-6 text-gray-900">
								<time class="sm:hidden" dateTime={format(selectedDate, DATE)}>
									{format(selectedDate, 'MMM, yyyy')}
								</time>
								<time class="hidden sm:inline" dateTime={format(selectedDate, DATE)}>
									{format(selectedDate, 'MMMM dd, yyyy')}
								</time>
							</h1>
						</div>

						<WeekChanger bind:selectedDate bind:weekStart={weekStart.value} />

						<div class="hidden h-7 border-r border-gray-300 sm:inline"></div>

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

				<WeekListSelector
					bind:selectedDate
					{routines}
					weekStart={weekStart.value}
					{previousWeekStart}
				/>

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
