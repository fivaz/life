<script module lang="ts">
	import { defineMeta, setTemplate } from '@storybook/addon-svelte-csf';
	import { format } from 'date-fns';
	import type { ComponentProps } from 'svelte';

	import { DATE } from '$lib/consts';
	import type { yyyyMMdd } from '$lib/task/task.model';
	import {
		longRecurring,
		normalWithDescription,
		normalWithoutDescriptionWithGoal,
		normalWithoutDescriptionWithoutGoal,
		normalWithSubTasks,
		shortWithDescription,
		shortWithoutDescription,
		shortWithSubTasks,
	} from '$lib/task/task.seed';

	import EventPanel from './EventPanel.svelte';
	const { Story } = defineMeta({
		component: EventPanel,
		args: {
			class: '!static',
			targetDate: format(new Date(), DATE) as yyyyMMdd,
		},
	});
</script>

<script lang="ts">
	
setTemplate(template as any);
</script>

{#snippet template({ ...args }: ComponentProps<typeof EventPanel>)}
	<div class="!relative w-52">
		<EventPanel {...args} />
	</div>
{/snippet}

<Story
	args={{ event: normalWithoutDescriptionWithGoal }}
	name="Normal without description with goal"
/>

<Story
	args={{ event: normalWithoutDescriptionWithoutGoal }}
	name="Normal without description without goal"
/>

<Story args={{ event: normalWithDescription }} name="Normal with a description" />

<Story args={{ event: normalWithSubTasks }} name="Normal with sub tasks" />

<Story args={{ event: shortWithoutDescription }} name="Short without description" />

<Story args={{ event: shortWithDescription }} name="Short with a description" />

<Story args={{ event: shortWithSubTasks }} name="Short with sub tasks" />

<Story args={{ event: longRecurring }} name="Long recurring" />
