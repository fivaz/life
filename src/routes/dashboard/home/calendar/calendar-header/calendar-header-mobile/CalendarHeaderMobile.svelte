<script lang="ts">
	import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@rgossiaux/svelte-headlessui';
	import { ChevronLeft, ChevronRight, EllipsisHorizontal } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import classnames from 'classnames';
	export let dateStart: string;
	export let goToPreviousWeek: () => void;
	export let goToToday: () => void;
	export let goToNextWeek: () => void;
	export let createEvent: () => void;

	const directionControls = [
		{
			onClick: () => createEvent,
			text: 'Create event',
		},
		{
			onClick: goToToday,
			text: 'Go to today',
		},
	];
</script>

<div class="flex flex-none items-center justify-between">
	<h1 class="text-base font-semibold leading-6 text-gray-900">
		<time datetime={dateStart}>{dateStart}</time>
	</h1>
	<div class="flex items-center">
		<div class="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
			<button
				class="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50"
				on:click={goToPreviousWeek}
				type="button"
			>
				<span class="sr-only">Previous week</span>
				<Icon aria-hidden="true" class="h-5 w-5" src={ChevronLeft} />
			</button>
			<span class="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
			<button
				class="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50"
				on:click={goToNextWeek}
				type="button"
			>
				<span class="sr-only">Next week</span>
				<Icon aria-hidden="true" class="h-5 w-5" src={ChevronRight} />
			</button>
		</div>

		<!--Mobile-->
		<Menu class="relative ml-6 md:hidden">
			<MenuButton
				class="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500"
			>
				<span class="sr-only">Open menu</span>
				<Icon aria-hidden="true" class="h-5 w-5" src={EllipsisHorizontal} />
			</MenuButton>

			<Transition
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<MenuItems
					class="absolute right-0 z-10 mt-3 w-36 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
				>
					{#each directionControls as button (button.text)}
						<div class="py-1">
							<MenuItem let:active>
								<button
									class={classnames(
										active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
										'block w-full px-4 py-2 text-left text-sm',
									)}
									on:click={button.onClick}
								>
									{button.text}
								</button>
							</MenuItem>
						</div>
					{/each}
				</MenuItems>
			</Transition>
		</Menu>
	</div>
</div>
