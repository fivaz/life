<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import NewTimeLabs from './NewTimeLabs.svelte';

	export const meta = {
		argTypes: {},
		component: NewTimeLabs,
	} satisfies Meta<NewTimeLabs>;
</script>

<Template let:args>
	<NewTimeLabs {...args}></NewTimeLabs>
</Template>

<Story args={{}} name="Primary" />
