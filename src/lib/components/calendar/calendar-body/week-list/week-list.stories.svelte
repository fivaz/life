<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { addDays } from 'date-fns';

	import WeekList from './WeekList.svelte';

	export const meta = {
		argTypes: {},
		component: WeekList,
	} satisfies Meta<WeekList>;
</script>

<Template let:args>
	<WeekList {...args} dates={Array.from({ length: 7 }, (_, i) => addDays(new Date(), i))} />
</Template>

<Story args={{}} name="Primary" />
