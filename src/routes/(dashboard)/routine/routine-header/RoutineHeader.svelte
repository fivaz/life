<script lang="ts">
	import { format } from 'date-fns';
	import { Plus } from 'lucide-svelte';

	import Button from '$lib/components/form/button/Button.svelte';
	import WeekChanger from '$lib/components/week-changer/WeekChanger.svelte';
	import { formatDate, title } from '$lib/date.utils.svelte.js';
	import type { Routine } from '$lib/routine/routine.model';

	import { getOpenRoutineForm } from '../routine-rows/service';
	import Streak from '../streak/Streak.svelte';

	interface Props {
		routines: Routine[];
		selectedDate: Date;
		weekStart: Date;
	}

	let { routines, selectedDate = $bindable(), weekStart = $bindable() }: Props = $props();

	const openForm = getOpenRoutineForm();
</script>

<div class="flex items-center justify-between">
	<h1 class="hidden text-2xl font-bold text-gray-900 md:block">{title.value}</h1>
	<div class="flex flex-grow items-center justify-between gap-5 md:flex-grow-0 md:justify-start">
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

		<WeekChanger bind:selectedDate bind:weekStart />

		<div class="hidden h-7 border-r border-gray-300 sm:inline"></div>

		<Button onclick={() => openForm()}>
			<Plus class="h-4 w-auto" />
			<span class="hidden md:block">New Routine</span>
		</Button>
	</div>
</div>
