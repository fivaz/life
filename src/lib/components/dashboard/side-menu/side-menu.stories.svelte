<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { user } from '$lib/user/seed';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	import SideMenu from './SideMenu.svelte';

	export const meta = {
		argTypes: {},
		component: SideMenu,
		parameters: {
			layout: 'fullscreen',
		},
	} satisfies Meta<SideMenu>;
</script>

<Template let:args>
	<SideMenu {...args} />
</Template>

<Story args={{ currentUser: user }} name="Primary" />
