<script lang="ts">
	import type { TaskIn } from '$lib/task/task-in-utils';

	import Input from '$lib/components/form/input/Input.svelte';
	import Toggle from '$lib/components/form/toggle/Toggle.svelte';
	import { getDuration, getEndTime } from '$lib/components/task-form/service';

	export let taskIn: TaskIn;

	let isEventOpen = true;
</script>

<div class="rounded-lg bg-white p-2">
	<div class="flex">
		<button
			class="flex-1 text-start"
			on:click={() => {
				if (taskIn.isEvent) {
					isEventOpen = !isEventOpen;
				} else {
					taskIn.isEvent = true;
				}
			}}
			type="button"
		>
			Event
		</button>
		<Toggle bind:value={taskIn.isEvent} on:change={(e) => (isEventOpen = e.detail)} />
	</div>

	{#if taskIn.isEvent}
		<div class={isEventOpen ? 'block' : 'hidden'}>
			<!--		<Transition-->
			<!--			class="overflow-hidden transition-all duration-500"-->
			<!--			enterFrom="transform opacity-0 max-h-0"-->
			<!--			enterTo="transform opacity-100 max-h-36"-->
			<!--			leaveFrom="transform opacity-100 max-h-36"-->
			<!--			leaveTo="transform opacity-0 max-h-0"-->
			<!--			show={isEventOpen}-->
			<!--			unmount={false}-->
			<!--		>-->
			<Input bind:value={taskIn.date} label="Date" name="date" required type="date" />

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
		</div>
	{/if}
</div>
