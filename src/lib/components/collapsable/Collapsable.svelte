<script lang="ts">
	import {
		Disclosure,
		DisclosureButton,
		DisclosurePanel,
		Transition,
	} from '@rgossiaux/svelte-headlessui';
	import { ChevronRight } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	export let title: string;
</script>

<Disclosure class="rounded-lg bg-white p-2" defaultOpen let:open>
	<DisclosureButton class="flex w-full justify-between">
		<span>{title}</span>
		<Icon class="h-5 w-5 {open ? 'rotate-90 transform' : ''}" src={ChevronRight} />
	</DisclosureButton>
	<Transition
		class="overflow-hidden transition-all duration-500"
		enterFrom="transform opacity-0 max-h-0"
		enterTo="transform opacity-100 max-h-36"
		leaveFrom="transform opacity-100 max-h-36"
		leaveTo="transform opacity-0 max-h-0"
	>
		<DisclosurePanel class="flex flex-col gap-2 pt-2 text-gray-500">
			<slot />
		</DisclosurePanel>
	</Transition>
</Disclosure>
