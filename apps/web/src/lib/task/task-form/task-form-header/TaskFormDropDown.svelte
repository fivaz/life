<script lang="ts">
	import { LText } from '@life/shared';
	import { formatDate } from '@life/shared/date';
	import type { Task } from '@life/shared/task';
	import { CopyIcon, EllipsisVerticalIcon, ListTodoIcon } from 'lucide-svelte';

	import DropDownItem from '$lib/components/drop-down/drop-down-item/DropDownItem.svelte';
	import DropDown from '$lib/components/drop-down/DropDown.svelte';
	import { duplicateTask, taskIn } from '$lib/task/task-form/service.svelte';
	import { currentUser } from '$lib/user/user.utils.svelte';

	interface Props {
		task: Task;
		close: () => void;
	}

	let { task, close }: Props = $props();
</script>

<DropDown
	class="rounded-md p-1.5 hover:bg-gray-200 dark:hover:bg-gray-800"
	closeAfterClick
	placement="bottom-start"
>
	{#snippet button()}
		<LText><EllipsisVerticalIcon class="size-5" /></LText>
	{/snippet}
	<!--TODO check if I truly want to update the date to today when I click on Mark as completed-->
	<DropDownItem
		class="w-48"
		onclick={() => {
			setTimeout(() => {
				taskIn.value.isDone = !taskIn.value.isDone;
				if (taskIn.value.date && taskIn.value.isDone) {
					taskIn.value.date = formatDate(new Date());
				}
			}, 100);
		}}
	>
		<ListTodoIcon class="size-5 shrink-0" />
		{taskIn.value.isDone ? 'Mark as uncompleted' : 'Mark as completed'}
	</DropDownItem>
	<DropDownItem
		onclick={() => {
			duplicateTask(task, currentUser.uid);
			close();
		}}
	>
		<CopyIcon class="size-5 shrink-0" />
		Duplicate task
	</DropDownItem>
</DropDown>
