<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { user } from '$lib/user/seed';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	import DashboardDesktop from './DashboardDesktop.svelte';

	export const meta = {
		argTypes: {},
		component: DashboardDesktop,
		parameters: {
			layout: 'fullscreen',
		},
	} satisfies Meta<DashboardDesktop>;
</script>

<Template let:args>
	<DashboardDesktop {...args} />
</Template>

<Story args={{ currentUser: user }} name="Primary" />
