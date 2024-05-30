<script lang="ts">
	import type { AnyTask } from '$lib/task/utils';

	import { tailwindColors } from '$lib/category/utils';
import { editTask } from '$lib/components/task-form/service';
	import { DATE, DATE_FR, DATE_FR_SHORT } from '$lib/consts';
	import { getTaskDate } from '$lib/task/time-utils';
	import { isToDo } from '$lib/task/utils';
	import { Settings2 } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { addDays, addWeeks, format, lastDayOfWeek } from 'date-fns';
	import interact from 'interactjs';
	import { createEventDispatcher, onMount } from 'svelte';

	import { GROUPS } from '../../service';
	import { TASK_LIST_CLASS } from '../service';

	export let task: AnyTask;
	export let userId: string;
	export let isDraggable: boolean;

	let dispatch = createEventDispatcher<{ edit: AnyTask; rescheduleToTomorrow: AnyTask }>();

	function formatDate(task: AnyTask, dateFormat: string) {
		const date = getTaskDate(task);
		return date ? format(date, dateFormat) : '';
	}

	let container: HTMLLIElement | undefined;

	let interactiveContainer: ReturnType<typeof interact> | null = null;

	let position = { x: 0, y: 0 };

	function onMove({ dx, dy, target }: { dx: number; dy: number; target: HTMLElement }) {
		position.x += dx;
		position.y += dy;

		target.style.transform = `translate(${position.x}px, ${position.y}px)`;
	}

	function startDrag(e: { target: HTMLElement }) {
		Object.assign(e.target.style, {
			touchAction: 'none',
			zIndex: '1',
		});
	}

	function getDateBeneath(draggedElement: HTMLLIElement, x: number, y: number): string | void {
		draggedElement.style.visibility = 'hidden';
		const element = document.elementFromPoint(x, y);
		draggedElement.style.visibility = '';
		if (!element) return;

		const list = element.closest<HTMLUListElement>(`.${TASK_LIST_CLASS}`);
		if (!list) return;

		const { date } = list.dataset;
		return date;
	}

	function getLiteralDate(date: string): string {
		if (date === GROUPS.Today) {
			return format(new Date(), DATE);
		}
		if (date === GROUPS.Tomorrow) {
			return format(addDays(new Date(), 1), DATE);
		}
		if (date === GROUPS.Week) {
			return format(lastDayOfWeek(new Date()), DATE);
		}
		if (date === GROUPS.NextWeek) {
			return format(lastDayOfWeek(addWeeks(new Date(), 1)), DATE);
		}
		if (date === GROUPS.Someday) {
			return '';
		}
		return date;
	}

	function moveTask(task: AnyTask, userId: string, date: string) {
		const newTask = {
			...task,
			...(isToDo(task) ? { deadline: date } : { date }),
		};
		const { id, ...data } = newTask;
		void editTask(id, data, userId, null, null);
	}

	function endDrag(e: { client: { x: number; y: number } }) {
		if (!container) return;

		const date = getDateBeneath(container, e.client.x, e.client.y);
		if (!date) return;

		const literalDate = getLiteralDate(date);

		moveTask(task, userId, literalDate);
	}

	onMount(() => {
		if (!container || !isDraggable) return;

		interactiveContainer = interact(container);

		interactiveContainer
			.draggable({ autoScroll: true, listeners: { move: onMove } })
			.on('contextmenu', (e) => e.preventDefault())
			.on('dragstart', startDrag)
			.on('dragend', endDrag);
	});
</script>

<li
	bind:this={container}
	class="{tailwindColors[task.category.color].darkBg}
		flex select-none justify-between gap-x-3 rounded-lg px-3 py-2 text-sm font-semibold leading-6 text-gray-50"
>
	<div class="flex items-center justify-between gap-x-3">
		<div class="hidden sm:block">{formatDate(task, DATE_FR)}</div>
		<div class="block sm:hidden">{formatDate(task, DATE_FR_SHORT)}</div>
		<div class="name">{task.name}</div>
	</div>

	<div class="flex items-center gap-x-3">
		<div class="w-12 text-center">{'duration' in task ? task.duration : '-'}</div>
		<button
			class="{tailwindColors[task.category.color].hoverBg} {tailwindColors[task.category.color]
				.hoverText}
				rounded px-1.5 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
			on:click={() => dispatch('edit', task)}
			type="button"
		>
			<Icon class="h-4 w-4 text-white" src={Settings2} />
		</button>
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
