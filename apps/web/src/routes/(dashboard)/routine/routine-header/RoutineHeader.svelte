<script lang="ts">
	import { Button, LText, WeekChanger } from '@life/shared';
	import { formatDate } from '@life/shared/date';
	import { format } from 'date-fns';
	import { EyeClosedIcon, EyeIcon } from 'lucide-svelte';

	import { tooltip } from '$lib/components/tooltip/tooltip.action';
	import type { Routine } from '$lib/routine/routine.model';
	import { buildEmptyRoutine } from '$lib/routine/routine.model';
	import { title } from '$lib/utils.svelte';

	import RoutineFormButton from '../routine-form-button/RoutineFormButton.svelte';
	import { selectedDate } from '../service.svelte';
	import Streak from '../streak/Streak.svelte';

	interface Props {
		routines: Routine[];
		showDisableRoutines: boolean;
	}

	let newRoutine = $state<Routine>(buildEmptyRoutine());

	let { routines, showDisableRoutines = $bindable() }: Props = $props();
</script>

<div class="flex items-center justify-between">
	<LText class="hidden text-2xl font-bold md:block">{title.value}</LText>
	<div class="flex flex-grow items-center justify-between md:flex-grow-0 md:justify-start md:gap-5">
		<Streak {routines} {showDisableRoutines} />
		<div>
			<LText class="flex items-center gap-2 text-base font-semibold leading-6">
				<time class="sm:hidden" dateTime={formatDate(selectedDate.value)}>
					{format(selectedDate.value, 'MMM, yyyy')}
				</time>
				<time class="hidden sm:inline" dateTime={formatDate(selectedDate.value)}>
					{format(selectedDate.value, 'MMMM dd, yyyy')}
				</time>
			</LText>
		</div>

		{#if showDisableRoutines}
			<Button color="white" onclick={() => (showDisableRoutines = false)} padding="p-1.5">
				<div use:tooltip={'hide disabled routines'}>
					<EyeClosedIcon class="size-4" />
				</div>
			</Button>
		{:else}
			<Button color="white" onclick={() => (showDisableRoutines = true)} padding="p-1.5">
				<div use:tooltip={'show disabled routines'}>
					<EyeIcon class="size-4" />
				</div>
			</Button>
		{/if}

		<WeekChanger bind:selectedDate={selectedDate.value} />

		<div class="hidden h-7 border-r border-gray-300 sm:block dark:border-gray-700"></div>

		<RoutineFormButton routine={newRoutine} />
	</div>
</div>
