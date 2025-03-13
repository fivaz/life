<script lang="ts">
	import { LText } from '@life/shared';
	import { formatDate } from '@life/shared/date';
	import type { Task } from '@life/shared/task';
	import { isUntimed } from '@life/shared/task';
	import { EllipsisVertical } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Copy, EllipsisVerticalIcon, ListTodo } from 'lucide-svelte';

	import DropDown from '$lib/components/drop-down/DropDown.svelte';
	import { duplicateTask, taskIn } from '$lib/task/task-form/service.svelte';
	import { currentUser } from '$lib/user/user.utils.svelte';

	interface Props {
		task: Task;
		close: () => void;
	}

	let { task, close }: Props = $props();

	function isAfterHalfToMidnight(task: Task): boolean {
		if (isUntimed(task)) return false;

		const [hours, minutes] = task.startTime.split(':').map(Number);

		if (hours < 23) return false;

		return minutes >= 30;
	}

	const optionsList = $derived.by(() => {
		const options: { icon?: typeof Copy; label: string; onclick: () => void }[] = [
			{
				icon: ListTodo,
				label: taskIn.value.isDone ? 'Mark as uncompleted' : 'Mark as completed',
				//setTimeout is necessary so the text doesn't change before the animation closes the dropdown
				onclick: () =>
					setTimeout(() => {
						taskIn.value.isDone = !taskIn.value.isDone;
						if (taskIn.value.date && taskIn.value.isDone) {
							taskIn.value.date = formatDate(new Date());
						}
					}, 100),
			},
		];

		if (!isAfterHalfToMidnight(task)) {
			options.push({
				icon: Copy,
				label: 'Duplicate task',
				onclick: () => {
					duplicateTask(task, currentUser.uid);
					close();
				},
			});
		}

		return options;
	});
</script>

<DropDown class="w-48" itemClass="text-gray-700" list={optionsList} position="bottom-left">
	<div class="rounded-md p-1.5 hover:bg-gray-200 dark:hover:bg-gray-800">
		<LText>
			<EllipsisVerticalIcon class="size-5" />
		</LText>
	</div>
</DropDown>
