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
		shortWithSubTasks
	} from '@life/shared/task';
	import { defineMeta, setTemplate } from '@storybook/addon-svelte-csf';

	import EventPanelCore from './EventPanelCore.svelte';

	const { Story } = defineMeta({
		component: EventPanelCore,
		args: {
			isSelected: false,
			targetDate: formatDate(new Date())
		}
	});

	import type { ComponentProps } from 'svelte';
</script>

<script lang="ts">
	setTemplate(template as any);
</script>

{#snippet template({ ...args }: ComponentProps<typeof EventPanelCore>)}
	<div class="relative h-48 w-48">
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
