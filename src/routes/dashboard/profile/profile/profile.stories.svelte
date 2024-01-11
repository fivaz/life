<script lang="ts" context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import Profile from './Profile.svelte';

	export const meta = {
		component: Profile,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
		},
	} satisfies Meta<Profile>;
</script>

<Template let:args>
	<Profile {...args} />
</Template>

<Story name="Primary" args={{ user: { id: 'test123', name: 'Test', username: 'test@test.com' } }} />
