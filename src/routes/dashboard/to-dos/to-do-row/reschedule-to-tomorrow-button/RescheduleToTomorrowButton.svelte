<script lang="ts">
	import { ArrowUturnUp } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import Button from '$lib/components/button/Button.svelte';
	import type { Task } from '$lib/task/utils';

	export let toDo: Task;
</script>

<form method="POST" action="?/rescheduleToTomorrow">
	<input type="hidden" name="id" value={toDo.id} />
	<input type="hidden" name="date" value={toDo.date} />
	<input type="hidden" name="startTime" value={toDo.startTime} />
	<input type="hidden" name="duration" value={toDo.duration} />
	<Button type="submit">
		<Icon src={ArrowUturnUp} class="h-4 w-4" />
	</Button>
</form>
