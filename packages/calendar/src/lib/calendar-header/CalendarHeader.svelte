<script lang="ts">
	import { formatDate, getCurrentRoundedDate } from '@life/lib/date';
	import { Button, WeekChanger } from '@life/ui';
	import { format } from 'date-fns';
	import { Plus } from 'lucide-svelte';

	import { getChangeDate, getCreateTask } from '../context.utils.js';
	import { currentDate, selectedDate } from '../service.svelte.js';

	const createTask = getCreateTask();

	const handleChangeDate = getChangeDate();
</script>

<header class="flex flex-none items-center justify-between border-b border-gray-200 px-6 py-4">
	<div>
		<h1 class="flex items-center gap-2 text-base font-semibold leading-6 text-gray-900">
			<time class="sm:hidden" dateTime={formatDate(selectedDate.value)}>
				{format(selectedDate.value, 'MMM dd, yyyy')}
			</time>
			<time class="hidden sm:inline" dateTime={formatDate(selectedDate.value)}>
				{format(selectedDate.value, 'MMMM dd, yyyy')}
			</time>
		</h1>
		<div class="mt-1 flex items-center gap-1 text-sm text-gray-500">
			<p>{format(selectedDate.value, 'eeee')}</p>
			<time dateTime={formatDate(selectedDate.value)}>
				{format(currentDate.value, 'hh:mm')}
			</time>
		</div>
	</div>

	<div class="flex items-center gap-5">
		<WeekChanger
			onchange={(selectedDate) => handleChangeDate(selectedDate)}
			bind:selectedDate={selectedDate.value}
		/>

		<div class="hidden h-7 border-r border-gray-300 md:block"></div>

		<Button onclick={() => createTask(getCurrentRoundedDate())} type="button">
			<Plus class="h-4 w-auto" />
			<span class="hidden md:block">Add event</span>
		</Button>
	</div>
</header>
