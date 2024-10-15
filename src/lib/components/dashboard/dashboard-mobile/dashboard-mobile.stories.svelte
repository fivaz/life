<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { user } from '$lib/utils/seed';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	import DashboardMobile from './DashboardMobile.svelte';

	export const meta = {
		argTypes: {},
		component: DashboardMobile,
		parameters: {
			layout: 'fullscreen',
		},
	} satisfies Meta<DashboardMobile>;
</script>

<Template let:args>
	<DashboardMobile {...args} />
</Template>

<Story args={{ currentUser: user }} name="Primary" />
