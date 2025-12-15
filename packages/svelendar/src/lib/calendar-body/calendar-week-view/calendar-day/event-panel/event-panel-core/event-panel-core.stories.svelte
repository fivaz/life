<script lang="ts" module>
	import { formatDate } from '@life/shared/date';
	import {
		longRecurring,
		normalWithDescription,
		normalWithoutDescriptionWithGoal,
		normalWithoutDescriptionWithoutGoal,
		normalWithSubTasks,
		shortWithDescription,
		shortWithoutDescription,
		shortWithSubTasks,
	} from '@life/shared/task';
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import type { ComponentProps } from 'svelte';

	import EventPanelCore from './EventPanelCore.svelte';

	const { Story } = defineMeta({
		component: EventPanelCore,
		render: template,
		args: {
			isSelected: false,
			targetDate: formatDate(new Date()),
		},
	});

	type Args = ComponentProps<typeof EventPanelCore>;
</script>

{#snippet template({ ...args }: Args)}
	<div class="relative size-48">
		<EventPanelCore {...args} />
	</div>
{/snippet}

<Story
	name="Normal without description with goal"
	args={{ event: normalWithoutDescriptionWithGoal }}
/>

<Story
	name="Normal without description without goal"
	args={{ event: normalWithoutDescriptionWithoutGoal }}
/>

<Story name="Normal with a description" args={{ event: normalWithDescription }} />

<Story name="Normal with sub tasks" args={{ event: normalWithSubTasks }} />

<Story name="Short without description" args={{ event: shortWithoutDescription }} />

<Story name="Short with a description" args={{ event: shortWithDescription }} />

<Story name="Short with sub tasks" args={{ event: shortWithSubTasks }} />

<Story name="Long recurring" args={{ event: longRecurring }} />
