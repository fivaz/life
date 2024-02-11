<script lang="ts">
	import type { AnyTask } from '$lib/task/utils';

	import { tailwindColors } from '$lib/category/utils';
	import Button from '$lib/components/button/Button.svelte';
	import { DATE, DATE_FR, DATE_FR_SHORT } from '$lib/consts';
	import { Settings } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import classnames from 'classnames';
	import { format, parse } from 'date-fns';
	import { createEventDispatcher } from 'svelte';

	export let task: AnyTask;

	let dispatch = createEventDispatcher<{ edit: AnyTask; rescheduleToTomorrow: AnyTask }>();

	function getDate(task: AnyTask) {
		const dateString = 'date' in task ? task.date : task.deadline;
		return parse(dateString, DATE, new Date());
	}
</script>

<li
	class={classnames(
		tailwindColors[task.category.color].darkBg,
		'flex gap-x-3 rounded-lg p-3 justify-between leading-6 font-semibold text-gray-50 text-sm',
	)}
>
	<div class="flex items-center gap-x-3 justify-between">
		<div class="hidden sm:block">{format(getDate(task), DATE_FR)}</div>
		<div class="sm:hidden block">{format(getDate(task), DATE_FR_SHORT)}</div>
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
