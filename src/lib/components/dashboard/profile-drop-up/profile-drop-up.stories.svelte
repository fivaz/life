<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { ChevronDown } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	import ProfileDropUp from './ProfileDropUp.svelte';

	export const meta = {
		component: ProfileDropUp,
	} satisfies Meta<ProfileDropUp>;
</script>

<Template let:args>
	<ProfileDropUp {...args}>
		<div
			class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
		>
			Options
			<Icon aria-hidden="true" class="-mr-1 h-5 w-5 text-gray-400" src={ChevronDown} />
		</div>
	</ProfileDropUp>
</Template>

<Story args={{}} name="Primary" />
