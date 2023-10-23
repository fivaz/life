<script lang="ts">
	import { Transition, Menu, MenuButton, MenuItems, MenuItem } from '@rgossiaux/svelte-headlessui';
	import { ChevronLeft, ChevronRight, ChevronDown, EllipsisHorizontal } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import classnames from 'classnames';
	import { addDays, format } from 'date-fns';
	import { createEventDispatcher } from 'svelte';

	export let currentDate: Date;
	export let weekStart: Date;

	const dispatch = createEventDispatcher();

	function nextWeek() {
		weekStart = addDays(weekStart, 7);
		console.log(weekStart);
	}

	function previousWeek() {
		weekStart = addDays(weekStart, -7);
		console.log(weekStart);
	}
</script>

<header class="flex flex-none items-center justify-between border-b border-gray-200 px-6 py-4">
	<h1 class="text-base font-semibold leading-6 text-gray-900">
		<time datetime={format(currentDate, 'yyyy-MM')}>{format(currentDate, 'MMMM yyyy')}</time>
	</h1>
	<div class="flex items-center">
		<div class="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
			<button
				on:click={previousWeek}
				type="button"
				class="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50"
			>
				<span class="sr-only">Previous week</span>
				<Icon src={ChevronLeft} class="h-5 w-5" aria-hidden="true" />
			</button>
			<button
				type="button"
				class="hidden border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block"
				>Today
			</button>
			<span class="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
			<button
				on:click={nextWeek}
				type="button"
				class="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50"
			>
				<span class="sr-only">Next week</span>
				<Icon src={ChevronRight} class="h-5 w-5" aria-hidden="true" />
			</button>
		</div>
		<div class="hidden md:ml-4 md:flex md:items-center">
			<Menu class="relative">
				<MenuButton
					type="button"
					class="flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
				>
					Week view
					<Icon src={ChevronDown} class="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
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
						class="absolute right-0 z-10 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
					>
						<div class="py-1">
							<MenuItem let:active>
								<button
									class={classnames(
										active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
										'block px-4 py-2 text-sm'
									)}
								>
									Day view
								</button>
							</MenuItem>
							<MenuItem let:active>
								<button
									class={classnames(
										active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
										'block px-4 py-2 text-sm'
									)}
								>
									Week view
								</button>
							</MenuItem>
							<MenuItem let:active>
								<button
									class={classnames(
										active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
										'block px-4 py-2 text-sm'
									)}
								>
									Month view
								</button>
							</MenuItem>
							<MenuItem let:active>
								<button
									class={classnames(
										active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
										'block px-4 py-2 text-sm'
									)}
								>
									Year view
								</button>
							</MenuItem>
						</div>
					</MenuItems>
				</Transition>
			</Menu>
			<div class="ml-6 h-6 w-px bg-gray-300" />
			<button
				type="button"
				on:click={() => dispatch('create')}
				class="ml-6 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
			>
				Create event
			</button>
		</div>
		<!--Mobile-->
		<Menu class="relative ml-6 md:hidden">
			<MenuButton
				class="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500"
			>
				<span class="sr-only">Open menu</span>
				<Icon src={EllipsisHorizontal} class="h-5 w-5" aria-hidden="true" />
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
					<div class="py-1">
						<MenuItem let:active>
							<button
								on:click={() => dispatch('create')}
								class={classnames(
									active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
									'block px-4 py-2 text-sm'
								)}
							>
								Create event
							</button>
						</MenuItem>
					</div>
					<div class="py-1">
						<MenuItem let:active>
							<button
								class={classnames(
									active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
									'block px-4 py-2 text-sm'
								)}
								>Go to today
							</button>
						</MenuItem>
					</div>
					<div class="py-1">
						<MenuItem let:active>
							<button
								class={classnames(
									active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
									'block px-4 py-2 text-sm'
								)}
								>Day view
							</button>
						</MenuItem>
						<MenuItem let:active>
							<button
								class={classnames(
									active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
									'block px-4 py-2 text-sm'
								)}
								>Week view
							</button>
						</MenuItem>
						<MenuItem let:active>
							<button
								class={classnames(
									active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
									'block px-4 py-2 text-sm'
								)}
								>Month view
							</button>
						</MenuItem>
						<MenuItem let:active>
							<button
								class={classnames(
									active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
									'block px-4 py-2 text-sm'
								)}
								>Year view
							</button>
						</MenuItem>
					</div>
				</MenuItems>
			</Transition>
		</Menu>
	</div>
</header>
