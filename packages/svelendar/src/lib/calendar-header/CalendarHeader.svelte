<script lang="ts">
	import { Button, LText, WeekChanger } from '@life/shared';
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
		<LText class="mt-1 flex items-center gap-1 text-sm" level="middle">
			<p>{format(selectedDate.value, 'eeee')}</p>
			<time dateTime={formatDate(selectedDate.value)}>
				{format(currentDate.value, 'hh:mm')}
			</time>
		</LText>
	</div>

	<div class="flex items-center gap-5">
		<WeekChanger
			onchange={(selectedDate) => handleChangeDate(selectedDate)}
			bind:selectedDate={selectedDate.value}
		/>

		<div
			class="hidden h-7 divide-gray-400 border-r border-gray-400 md:block dark:divide-gray-700 dark:border-gray-700"
		></div>

		<Button id="tutorial-create-event-button" onclick={() => createTask(selectedDate.value)} type="button">
			<PlusIcon class="size-4" />
			<span class="hidden md:block">Add event</span>
		</Button>
	</div>
</header>
