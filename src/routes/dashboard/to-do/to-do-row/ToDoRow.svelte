<script lang="ts">
	import { Settings } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { tailwindColors } from '$lib/category/utils';
	import Button from '$lib/components/button/Button.svelte';
	import type { EEvent } from '$lib/event/utils';
	import { convertToTime } from '$lib/event/utils';
	import { DATE_FR, TIME } from '$lib/utils';
	import classnames from 'classnames';
	import { format } from 'date-fns';
	import { createEventDispatcher } from 'svelte';
	import type { ActionData } from '../../../../../.svelte-kit/types/src/routes/dashboard/to-do/$types';
	import RescheduleToTomorrowButton from './reschedule-to-tomorrow-button/RescheduleToTomorrowButton.svelte';

	export let toDo: EEvent;
	export let form: ActionData | null;

	let dispatch = createEventDispatcher<{ edit: EEvent; rescheduleToTomorrow: EEvent }>();
</script>

<li
	class={classnames(
		tailwindColors[toDo.category.color].darkBg,
		'flex gap-x-6 items-center rounded-lg p-3',
	)}
>
	<div class="flex-1 flex gap-x-6 text-sm font-semibold leading-6 text-gray-50">
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
