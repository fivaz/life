<script lang="ts">
	import type { Task } from '@life/shared/task';
	import { isUntimed } from '@life/shared/task';
	import { EllipsisVertical } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Copy, ListTodo } from 'lucide-svelte';

	import CloseX from '$lib/components/close-x/CloseX.svelte';
	import DropDown from '$lib/components/drop-down/DropDown.svelte';
	import { duplicateTask, taskIn } from '$lib/task/task-form/service.svelte';
	import { currentUser } from '$lib/user/user.utils.svelte';

	interface Props {
		task: Task;
		close: () => void;
	}

	let { task, close }: Props = $props();

	let formName = $derived(`${task.id ? 'Edit' : 'Add'} ${isUntimed(task) ? 'Task' : 'Event'}`);

	function isAfterHalfToMidnight(task: Task): boolean {
		if (isUntimed(task)) return false;

		const [hours, minutes] = task.startTime.split(':').map(Number);

		console.log(hours, minutes);

		if (hours < 23) return false;

		return minutes >= 30;
	}

	const optionsList = $derived.by(() => {
		const options: { icon?: typeof Copy; label: string; onclick: () => void }[] = [
			{
				icon: ListTodo,
				label: taskIn.value.isDone ? 'Mark as uncompleted' : 'Mark as completed',
				//setTimeout is necessary so the text doesn't change before the animation closes the dropdown
				onclick: () => setTimeout(() => (taskIn.value.isDone = !taskIn.value.isDone), 100),
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

<div class="flex items-center justify-between">
	<h2 class="text-lg text-gray-900">{formName}</h2>
	<div class="flex items-center">
		<DropDown class="w-48" itemClass="text-gray-700" list={optionsList} position="bottom-left">
			<div class="rounded-md p-1 hover:bg-gray-200">
				<Icon class="h-5 w-auto" src={EllipsisVertical} />
			</div>
		</DropDown>
		<CloseX {close} />
	</div>
</div>
