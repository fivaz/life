<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import Profile from './Profile.svelte';

	export const meta = {
		component: Profile,
		parameters: {
			layout: 'centered',
		},
		tags: ['autodocs'],
	} satisfies Meta<Profile>;
</script>

<Template let:args>
	<Profile {...args} />
</Template>

<Story args={{ user: { id: 'test123', name: 'Test', username: 'test@test.com' } }} name="Primary" />
