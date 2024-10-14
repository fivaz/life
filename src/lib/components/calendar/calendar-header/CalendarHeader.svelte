<script lang="ts">
	import Button from '$lib/components/form/button/Button.svelte';
	import { DATE } from '$lib/consts';
	import { getCurrentRoundedDate } from '$lib/task/time-utils';
	import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@rgossiaux/svelte-headlessui';
	import { ChevronLeft, ChevronRight, EllipsisHorizontal } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { clsx } from 'clsx';
	import { addDays, format, isSameWeek, startOfWeek } from 'date-fns';
	import { createEventDispatcher } from 'svelte';

	export let weekStart: Date;

	export let selectedDate: Date;

	let currentDate = new Date();

	function goToToday() {
		selectedDate = currentDate;
		weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 });
	}

	function goToNextWeek() {
		weekStart = addDays(weekStart, 7);
		selectedDate = isSameWeek(currentDate, weekStart, { weekStartsOn: 1 })
			? currentDate
			: weekStart;
	}

	function goToPreviousWeek() {
		weekStart = addDays(weekStart, -7);
		selectedDate = isSameWeek(currentDate, weekStart, { weekStartsOn: 1 })
			? currentDate
			: weekStart;
	}

	const dispatch = createEventDispatcher<{ createTask: Date }>();

	$: createEvent = () => dispatch('createTask', getCurrentRoundedDate());
</script>

<header class="flex flex-none items-center justify-between border-b border-gray-200 px-6 py-4">
	<div>
		<h1 class="text-base font-semibold leading-6 text-gray-900">
			<time class="sm:hidden" dateTime={format(selectedDate, DATE)}>
				{format(selectedDate, 'MMM dd, yyyy')}
			</time>
			<time class="hidden sm:inline" dateTime={format(selectedDate, DATE)}>
				{format(selectedDate, 'MMMM dd, yyyy')}
			</time>
		</h1>
		<p class="mt-1 text-sm text-gray-500">{format(selectedDate, 'eeee')}</p>
	</div>

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

			<button
				class="hidden border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block"
				on:click={goToToday}
				type="button"
			>
				Today
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

		<div class="hidden md:ml-4 md:flex md:items-center">
			<div class="ml-3 h-6 w-px bg-gray-300" />

			<Button class="ml-6" on:click={createEvent} type="button">Add event</Button>
		</div>

		<Menu as="div" class="relative ml-6 md:hidden">
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
					<div class="py-1">
						<MenuItem let:active>
							<button
								class={clsx(
									active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
									'block w-full px-4 py-2 text-left text-sm',
								)}
								on:click={createEvent}
							>
								Create event
							</button>
						</MenuItem>
					</div>
					<div class="py-1">
						<MenuItem let:active>
							<button
								class={clsx(
									active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
									'block w-full px-4 py-2 text-left text-sm',
								)}
								on:click={goToToday}
							>
								Go to today
							</button>
						</MenuItem>
					</div>
				</MenuItems>
			</Transition>
		</Menu>
	</div>
</header>
