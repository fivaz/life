<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { getTimeSlots } from '$lib/components/calendar/calendar-body/calendar-columns/calendar-rows/service';
	import { done, long, normalWithoutDescription, shortWithoutDescription } from '$lib/task/seed';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	import EventPanel from './EventPanel.svelte';

	export const meta = {
		argTypes: {},
		component: EventPanel,
		parameters: {
			layout: 'centered',
		},
	} satisfies Meta<EventPanel>;
</script>

<script>
	import { tasks } from '$lib/task/seed';
</script>

<Template let:args>
	<div class="!relative w-52">
		<EventPanel
			{...args}
			class="!static"
			on:editTask={(args) => console.log('editTask', args.detail)}
			on:moveEvent={(args) => console.log('moveEvent', args.detail)}
			on:toggleEvent={(args) => console.log('toggleEvent', args.detail)}
			targetDate={new Date()}
			timeSlots={getTimeSlots(tasks, new Date())}
		/>
	</div>
</Template>

<Story args={{ event: normalWithoutDescription }} name="Normal without a description" />

<Story args={{ event: shortWithoutDescription }} name="Short without a description" />

<Story args={{ event: long }} name="Long" />

<Story args={{ event: done }} name="Done" />
