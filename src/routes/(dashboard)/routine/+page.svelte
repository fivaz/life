<script lang="ts">
	import { format, startOfWeek } from 'date-fns';
	import { onSnapshot, type Unsubscribe } from 'firebase/firestore';
	import { Calendar1, Plus } from 'lucide-svelte';

	import Button from '$lib/components/form/button/Button.svelte';
	import Loading from '$lib/components/loading/Loading.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import WeekChanger from '$lib/components/week-changer/WeekChanger.svelte';
	import { weekStartsOn } from '$lib/consts';
	import { buildEmptyRoutine, type Routine } from '$lib/routine/routine.model';
	import { currentUser } from '$lib/user/user.utils.svelte';
	import { formatDate, title } from '$lib/utils.svelte';

	import RoutineForm from './routine-form/RoutineForm.svelte';
	import RoutineRows from './routine-rows/RoutineRows.svelte';
	import { setOpenRoutineForm } from './routine-rows/service';
	import { getRoutinePath, isLoading, populateRoutines, routinesMap } from './service.svelte';
	import Streak from './streak/Streak.svelte';
	import WeekListSelector from './week-list-selector/WeekListSelector.svelte';

	let _weekStart = $state<Date>(startOfWeek(new Date(), { weekStartsOn }));

	// this is used in WeekListSelector to know the right direction for the slide animation
	let previousWeekStart = $state<Date>(startOfWeek(new Date(), { weekStartsOn }));

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

	let selectedDate = $state<Date>(new Date());

	title.value = 'Routine';

	function openForm(routine: Routine) {
		showForm = true;
		editingRoutine = routine;
	}

	setOpenRoutineForm(openForm);

	$effect(() => {
		let unsubscribe: Unsubscribe = () => {};

		if (currentUser.uid) {
			isLoading.value = true;
			unsubscribe = onSnapshot(getRoutinePath(currentUser.uid), populateRoutines);
		}

		return () => unsubscribe();
	});
</script>

{#if currentUser.uid}
	{@const routines = Object.values(routinesMap.value).flat()}
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
							<time class="sm:hidden" dateTime={formatDate(selectedDate)}>
								{format(selectedDate, 'MMM, yyyy')}
							</time>
							<time class="hidden sm:inline" dateTime={formatDate(selectedDate)}>
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

			<RoutineRows userId={currentUser.uid} {selectedDate} />

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
				<RoutineForm
					close={() => (showForm = false)}
					routine={editingRoutine}
					userId={currentUser.uid}
				/>
			</Modal>
		</div>
	</div>
{:else}
	<Loading />
{/if}
