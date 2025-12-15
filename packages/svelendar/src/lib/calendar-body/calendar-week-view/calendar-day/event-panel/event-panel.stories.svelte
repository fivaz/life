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

	import EventPanel from './EventPanel.svelte';

	const { Story } = defineMeta({
		component: EventPanel,
		render: template,
		args: {
			class: 'static!',
			targetDate: formatDate(new Date()),
		},
	});

	type Args = ComponentProps<typeof EventPanel>;
</script>

{#snippet template({ ...args }: Args)}
	<div class="relative! w-52">
		<EventPanel {...args} />
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
