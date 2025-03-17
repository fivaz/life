<script lang="ts">
	import { Button, LText, WeekChanger } from '@life/shared';
	import { bgColors, borderColors, textColors } from '@life/shared/colors';
	import { formatDate } from '@life/shared/date';
	import { format } from 'date-fns';
	import { PlusIcon } from 'lucide-svelte';

	import { getChangeDate, getCreateTask } from '../context.utils.js';
	import { currentDate, selectedDate } from '../service.svelte.js';

	const createTask = getCreateTask();

	const handleChangeDate = getChangeDate();
</script>

<header class="flex flex-none items-center justify-between px-6 py-4">
	<div>
		<LText class="flex items-center gap-2 text-base font-semibold leading-6">
			<time class="sm:hidden" dateTime={formatDate(selectedDate.value)}>
				{format(selectedDate.value, 'MMM dd, yyyy')}
			</time>
			<time class="hidden sm:inline" dateTime={formatDate(selectedDate.value)}>
				{format(selectedDate.value, 'MMMM dd, yyyy')}
			</time>
		</LText>
		<div class="mt-1 flex items-center gap-1 text-sm {textColors.middle}">
			<p>{format(selectedDate.value, 'eeee')}</p>
			<time dateTime={formatDate(selectedDate.value)}>
				{format(currentDate.value, 'hh:mm')}
			</time>
		</div>
	</div>

	<div class="flex items-center gap-5">
		<WeekChanger
			class={textColors.dark}
			onchange={(selectedDate) => handleChangeDate(selectedDate)}
			bind:selectedDate={selectedDate.value}
		/>

		<div class="hidden h-7 border-r md:block {borderColors.darker}"></div>

		<Button onclick={() => createTask(selectedDate.value)} type="button">
			<PlusIcon class="size-4" />
			<span class="hidden md:block">Add event</span>
		</Button>
	</div>
</header>
