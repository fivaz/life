<script lang="ts">
	import { ArrowUturnUp } from '@steeze-ui/heroicons';
	import { Settings } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import Button from '$lib/components/button/Button.svelte';
	import type { EEvent } from '$lib/event/utils';
	import { convertToTime } from '$lib/event/utils';
	import { DATE, DATE_FR, DATETIME_FR, TIME } from '$lib/utils';
	import { format } from 'date-fns';
	import { createEventDispatcher } from 'svelte';
	import type { ActionData } from '../../../../../.svelte-kit/types/src/routes/dashboard/to-do/$types';
	import RescheduleToTomorrowButton from './reschedule-to-tomorrow-button/RescheduleToTomorrowButton.svelte';

	export let toDo: EEvent;
	export let form: ActionData | null;

	let dispatch = createEventDispatcher<{ edit: EEvent; rescheduleToTomorrow: EEvent }>();
</script>

<li class="flex gap-x-6 py-3 items-center">
	<div class="flex-1 flex gap-x-6 text-sm font-semibold leading-6 text-gray-900">
		<div class="flex-1 flex gap-x-6">
			<div>{format(toDo.startDate, DATE_FR)}</div>
			<div>{toDo.name}</div>
		</div>
		<div>{format(toDo.startDate, TIME)}</div>
		<div>{convertToTime(toDo.duration)}</div>
	</div>

	<div class="flex gap-x-3">
		<Button on:click={() => dispatch('edit', toDo)} type="button">
			<Icon src={Settings} class="h-4 w-4" />
		</Button>
		<RescheduleToTomorrowButton {toDo} {form} />
	</div>
</li>
