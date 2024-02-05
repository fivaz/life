<script lang="ts">
	import type { Task } from '$lib/task/utils';

	import { tailwindColors } from '$lib/category/utils';
	import Button from '$lib/components/button/Button.svelte';
	import { DATE, DATE_FR } from '$lib/consts';
	import { Settings } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import classnames from 'classnames';
	import { format, parse } from 'date-fns';
	import { createEventDispatcher } from 'svelte';

	export let task: Task;

	let dispatch = createEventDispatcher<{ edit: Task; rescheduleToTomorrow: Task }>();

	function getDate(task: Task) {
		const date = task.date || task.deadline;
		return format(parse(date, DATE, new Date()), DATE_FR);
	}
</script>

<li
	class={classnames(
		tailwindColors[task.category.color].darkBg,
		'flex gap-x-6 items-center rounded-lg p-3',
	)}
>
	<div class="flex-1 flex gap-x-6 text-sm font-semibold leading-6 text-gray-50">
		<div class="flex-1 flex gap-x-6">
			<div>{getDate(task)}</div>
			<div>{task.name}</div>
		</div>
		<!--		<div>{task.startDate ? format(task.startDate, TIME) : ''}</div>-->
		<!--		<div>{convertToTime(task.duration)}</div>-->
	</div>

	<div class="flex gap-x-3">
		<Button on:click={() => dispatch('edit', task)} type="button">
			<Icon class="h-4 w-4" src={Settings} />
		</Button>
	</div>
</li>
