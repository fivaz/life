<script lang="ts">
	import type { Task } from '@life/shared/task';
	import { dndzone } from 'svelte-dnd-action';

	interface Props {
		listName: string;
		tasks: Task[];
	}

	let { listName, tasks }: Props = $props();

	function handleDnd({ detail }) {
		const { items, from, to, dragging } = detail;

		// implement logic to update task date if needed
		// e.g., when moving from "today" to "tomorrow"
	}
</script>

<section>
	<h2>{listName}</h2>
	<ul
		onconsider={handleDnd}
		onfinalize={handleDnd}
		use:dndzone={{
			items: tasks,
			flipDurationMs: 300,
			type: listName,
			dragDisabled: listName.startsWith('recurring'),
			dropFromOthersDisabled: listName.startsWith('recurring') || listName === 'overdue',
		}}
	>
		{#each tasks as task (task.id)}
			<li>{task.name}</li>
		{/each}
	</ul>
</section>
