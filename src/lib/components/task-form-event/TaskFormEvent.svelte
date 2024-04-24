<script lang="ts">
	import Input from '$lib/components/input/Input.svelte';
	import { type TaskIn, getDuration, getEndTime } from '$lib/components/task-form/service';

	export let taskIn: TaskIn;
</script>

<div class="flex gap-3 overflow-hidden pt-2">
	<Input bind:value={taskIn.date} class="w-1/2" label="Date" name="date" required type="date" />

	<Input
		bind:value={taskIn.duration}
		class="w-1/2"
		label="Duration"
		name="duration"
		on:input={(e) => (taskIn.endTime = getEndTime(taskIn.startTime, e.detail))}
		required
		type="time"
	/>
</div>

<div class="flex gap-3">
	<Input
		bind:value={taskIn.startTime}
		class="w-1/2"
		label="Start time"
		name="startTime"
		on:input={(e) => (taskIn.endTime = getEndTime(e.detail, taskIn.duration))}
		required
		type="time"
	/>

	<Input
		bind:value={taskIn.endTime}
		class="w-1/2"
		label="End time"
		name="endTime"
		on:input={(e) => (taskIn.duration = getDuration(taskIn.startTime, e.detail))}
		required
		type="time"
	/>
</div>
