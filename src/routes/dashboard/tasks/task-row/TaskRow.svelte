<script lang="ts">
	import type { AnyTask } from '$lib/task/utils';

	import { tailwindColors } from '$lib/category/utils';
	import Button from '$lib/components/button/Button.svelte';
	import { DATE_FR, DATE_FR_SHORT } from '$lib/consts';
	import { getTaskDate } from '$lib/task/time-utils';
	import { Settings } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { clsx } from 'clsx';
	import { format } from 'date-fns';
	import { createEventDispatcher } from 'svelte';

	export let task: AnyTask;

	let dispatch = createEventDispatcher<{ edit: AnyTask; rescheduleToTomorrow: AnyTask }>();

	function formatDate(task: AnyTask, dateFormat: string) {
		const date = getTaskDate(task);
		return date ? format(date, dateFormat) : '';
	}
</script>

<li
	class={clsx(
		tailwindColors[task.category.color].darkBg,
		'flex justify-between gap-x-3 rounded-lg p-3 text-sm font-semibold leading-6 text-gray-50',
	)}
>
	<div class="flex items-center justify-between gap-x-3">
		<div class="hidden sm:block">{formatDate(task, DATE_FR)}</div>
		<div class="block sm:hidden">{formatDate(task, DATE_FR_SHORT)}</div>
		<div class="name">{task.name}</div>
	</div>

	<div class="flex items-center gap-x-3">
		<div class="w-12 text-center">{'duration' in task ? task.duration : '-'}</div>
		<Button on:click={() => dispatch('edit', task)} type="button">
			<Icon class="h-4 w-4" src={Settings} />
		</Button>
	</div>
</li>

<style>
	.name {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
