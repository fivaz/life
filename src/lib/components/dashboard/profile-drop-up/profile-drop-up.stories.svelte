<script lang="ts" context="module">
	import { ChevronDown } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import ProfileDropUp from './ProfileDropUp.svelte';

	export const meta = {
		component: ProfileDropUp,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
		},
	} satisfies Meta<ProfileDropUp>;
</script>

<script>
</script>

<Template let:args>
	<ProfileDropUp {...args}>
		<div
			class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
		>
			Options
			<Icon src={ChevronDown} class="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
		</div>
	</ProfileDropUp>
</Template>

<Story name="Primary" args={{}} />
