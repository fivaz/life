<script lang="ts">
	import { Button, WeekChanger } from '@life/shared';
	import { formatDate } from '@life/shared/date';
	import { format } from 'date-fns';
	import { Plus } from 'lucide-svelte';

	import type { Routine } from '$lib/routine/routine.model';
	import { title } from '$lib/utils.svelte';

	import { getOpenRoutineForm } from '../routine-rows/service';
	import { selectedDate } from '../service.svelte';
	import Streak from '../streak/Streak.svelte';

	interface Props {
		routines: Routine[];
	}

	let { routines }: Props = $props();

	const openForm = getOpenRoutineForm();
</script>

<div class="flex items-center justify-between">
	<h1 class="hidden text-2xl font-bold text-gray-900 md:block">{title.value}</h1>
	<div class="flex flex-grow items-center justify-between gap-5 md:flex-grow-0 md:justify-start">
		<Streak {routines} />
		<div>
			<h1 class="flex items-center gap-2 text-base font-semibold leading-6 text-gray-900">
				<time class="sm:hidden" dateTime={formatDate(selectedDate.value)}>
					{format(selectedDate.value, 'MMM, yyyy')}
				</time>
				<time class="hidden sm:inline" dateTime={formatDate(selectedDate.value)}>
					{format(selectedDate.value, 'MMMM dd, yyyy')}
				</time>
			</h1>
		</div>

		<WeekChanger bind:selectedDate={selectedDate.value} />

		<div class="hidden h-7 border-r border-gray-300 sm:inline"></div>

		<Button onclick={() => openForm()}>
			<Plus class="h-4 w-auto" />
			<span class="hidden md:block">New Routine</span>
		</Button>
	</div>
</div>
