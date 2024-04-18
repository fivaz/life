<script lang="ts">
	import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@rgossiaux/svelte-headlessui';
	import { ChevronDown, ChevronLeft, ChevronRight, EllipsisHorizontal } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { clsx } from 'clsx';
	import { onMount } from 'svelte';

	const days = [
		{ date: '2021-12-27' },
		{ date: '2021-12-28' },
		{ date: '2021-12-29' },
		{ date: '2021-12-30' },
		{ date: '2021-12-31' },
		{ date: '2022-01-01', isCurrentMonth: true },
		{ date: '2022-01-02', isCurrentMonth: true },
		{ date: '2022-01-03', isCurrentMonth: true },
		{ date: '2022-01-04', isCurrentMonth: true },
		{ date: '2022-01-05', isCurrentMonth: true },
		{ date: '2022-01-06', isCurrentMonth: true },
		{ date: '2022-01-07', isCurrentMonth: true },
		{ date: '2022-01-08', isCurrentMonth: true },
		{ date: '2022-01-09', isCurrentMonth: true },
		{ date: '2022-01-10', isCurrentMonth: true },
		{ date: '2022-01-11', isCurrentMonth: true },
		{ date: '2022-01-12', isCurrentMonth: true },
		{ date: '2022-01-13', isCurrentMonth: true },
		{ date: '2022-01-14', isCurrentMonth: true },
		{ date: '2022-01-15', isCurrentMonth: true },
		{ date: '2022-01-16', isCurrentMonth: true },
		{ date: '2022-01-17', isCurrentMonth: true },
		{ date: '2022-01-18', isCurrentMonth: true },
		{ date: '2022-01-19', isCurrentMonth: true },
		{ date: '2022-01-20', isCurrentMonth: true, isToday: true },
		{ date: '2022-01-21', isCurrentMonth: true },
		{ date: '2022-01-22', isCurrentMonth: true, isSelected: true },
		{ date: '2022-01-23', isCurrentMonth: true },
		{ date: '2022-01-24', isCurrentMonth: true },
		{ date: '2022-01-25', isCurrentMonth: true },
		{ date: '2022-01-26', isCurrentMonth: true },
		{ date: '2022-01-27', isCurrentMonth: true },
		{ date: '2022-01-28', isCurrentMonth: true },
		{ date: '2022-01-29', isCurrentMonth: true },
		{ date: '2022-01-30', isCurrentMonth: true },
		{ date: '2022-01-31', isCurrentMonth: true },
		{ date: '2022-02-01' },
		{ date: '2022-02-02' },
		{ date: '2022-02-03' },
		{ date: '2022-02-04' },
		{ date: '2022-02-05' },
		{ date: '2022-02-06' },
	];

	let container: HTMLDivElement | null = null;
	let containerNav: HTMLDivElement | null = null;
	let containerOffset: HTMLDivElement | null = null;

	onMount(() => {
		// Set the container scroll position based on the current time.
		const currentMinute = new Date().getHours() * 60;
		if (!container || !containerNav || !containerOffset) {
			return;
		}
		container.scrollTop =
			((container.scrollHeight - containerNav.offsetHeight - containerOffset.offsetHeight) *
				currentMinute) /
			1440;
	});

	const viewControls = [{ text: 'Year view' }, { text: 'Week view' }, { text: 'Month view' }];
</script>

<div class="flex h-full flex-col">
	<header class="flex flex-none items-center justify-between border-b border-gray-200 px-6 py-4">
		<div>
			<h1 class="text-base font-semibold leading-6 text-gray-900">
				<time class="sm:hidden" dateTime="2022-01-22"> Jan 22, 2022 </time>
				<time class="hidden sm:inline" dateTime="2022-01-22"> January 22, 2022 </time>
			</h1>
			<p class="mt-1 text-sm text-gray-500">Saturday</p>
		</div>

		<div class="flex items-center">
			<div class="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
				<button
					class="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50"
					type="button"
				>
					<span class="sr-only">Previous day</span>
					<Icon aria-hidden="true" class="h-5 w-5" src={ChevronLeft} />
				</button>
				<button
					class="hidden border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block"
					type="button"
				>
					Today
				</button>
				<span class="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
				<button
					class="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50"
					type="button"
				>
					<span class="sr-only">Next day</span>
					<Icon aria-hidden="true" class="h-5 w-5" src={ChevronRight} />
				</button>
			</div>
			<div class="hidden md:ml-4 md:flex md:items-center">
				<Menu class="relative">
					<MenuButton
						class="flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
						type="button"
					>
						Day view
						<Icon aria-hidden="true" class="-mr-1 h-5 w-5 text-gray-400" src={ChevronDown} />
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
								{#each viewControls as viewControl (viewControl.text)}
									<MenuItem let:active>
										<button
											class={clsx(
												active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
												'block px-4 py-2 text-sm',
											)}
										>
											{viewControl.text}
										</button>
									</MenuItem>
								{/each}
							</div>
						</MenuItems>
					</Transition>
				</Menu>
				<div class="ml-6 h-6 w-px bg-gray-300" />
				<button
					class="ml-6 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					type="button"
				>
					Add event
				</button>
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
										'block px-4 py-2 text-sm',
									)}
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
										'block px-4 py-2 text-sm',
									)}
								>
									Go to today
								</button>
							</MenuItem>
						</div>
						<div class="py-1">
							{#each viewControls as viewControl (viewControl.text)}
								<MenuItem let:active>
									<button
										class={clsx(
											active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
											'block px-4 py-2 text-sm',
										)}
									>
										{viewControl.text}
									</button>
								</MenuItem>
							{/each}
						</div>
					</MenuItems>
				</Transition>
			</Menu>
		</div>
	</header>

	<div class="isolate flex flex-auto overflow-hidden bg-white">
		<div bind:this={container} class="flex flex-auto flex-col overflow-auto">
			<div
				bind:this={containerNav}
				class="sticky top-0 z-10 grid flex-none grid-cols-7 bg-white text-xs text-gray-500 shadow ring-1 ring-black ring-opacity-5 md:hidden"
			>
				<button class="flex flex-col items-center pb-1.5 pt-3" type="button">
					<span>W</span>
					<!--{/* Default: "text-gray-900", Selected: "bg-gray-900 text-white", Today (Not Selected): "text-indigo-600", Today (Selected): "bg-indigo-600 text-white" */}-->
					<span
						class="mt-3 flex h-8 w-8 items-center justify-center rounded-full text-base font-semibold text-gray-900"
					>
						19
					</span>
				</button>
				<button class="flex flex-col items-center pb-1.5 pt-3" type="button">
					<span>T</span>
					<span
						class="mt-3 flex h-8 w-8 items-center justify-center rounded-full text-base font-semibold text-indigo-600"
					>
						20
					</span>
				</button>
				<button class="flex flex-col items-center pb-1.5 pt-3" type="button">
					<span>F</span>
					<span
						class="mt-3 flex h-8 w-8 items-center justify-center rounded-full text-base font-semibold text-gray-900"
					>
						21
					</span>
				</button>
				<button class="flex flex-col items-center pb-1.5 pt-3" type="button">
					<span>S</span>
					<span
						class="mt-3 flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-base font-semibold text-white"
					>
						22
					</span>
				</button>
				<button class="flex flex-col items-center pb-1.5 pt-3" type="button">
					<span>S</span>
					<span
						class="mt-3 flex h-8 w-8 items-center justify-center rounded-full text-base font-semibold text-gray-900"
					>
						23
					</span>
				</button>
				<button class="flex flex-col items-center pb-1.5 pt-3" type="button">
					<span>M</span>
					<span
						class="mt-3 flex h-8 w-8 items-center justify-center rounded-full text-base font-semibold text-gray-900"
					>
						24
					</span>
				</button>
				<button class="flex flex-col items-center pb-1.5 pt-3" type="button">
					<span>T</span>
					<span
						class="mt-3 flex h-8 w-8 items-center justify-center rounded-full text-base font-semibold text-gray-900"
					>
						25
					</span>
				</button>
			</div>
			<div class="flex w-full flex-auto">
				<div class="w-14 flex-none bg-white ring-1 ring-gray-100" />
				<div class="grid flex-auto grid-cols-1 grid-rows-1">
					<!--{/* Horizontal lines */}-->
					<div
						class="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
						style="grid-template-rows: repeat(48, minmax(3.5rem, 1fr))"
					>
						<div bind:this={containerOffset} class="row-end-1 h-7"></div>
						<div>
							<div
								class="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
							>
								12AM
							</div>
						</div>
						<div />
						<div>
							<div
								class="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
							>
								1AM
							</div>
						</div>
						<div />
						<div>
							<div
								class="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
							>
								2AM
							</div>
						</div>
						<div />
						<div>
							<div
								class="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
							>
								3AM
							</div>
						</div>
						<div />
						<div>
							<div
								class="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
							>
								4AM
							</div>
						</div>
						<div />
						<div>
							<div
								class="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
							>
								5AM
							</div>
						</div>
						<div />
						<div>
							<div
								class="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
							>
								6AM
							</div>
						</div>
						<div />
						<div>
							<div
								class="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
							>
								7AM
							</div>
						</div>
						<div />
						<div>
							<div
								class="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
							>
								8AM
							</div>
						</div>
						<div />
						<div>
							<div
								class="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
							>
								9AM
							</div>
						</div>
						<div />
						<div>
							<div
								class="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
							>
								10AM
							</div>
						</div>
						<div />
						<div>
							<div
								class="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
							>
								11AM
							</div>
						</div>
						<div />
						<div>
							<div
								class="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
							>
								12PM
							</div>
						</div>
						<div />
						<div>
							<div
								class="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
							>
								1PM
							</div>
						</div>
						<div />
						<div>
							<div
								class="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
							>
								2PM
							</div>
						</div>
						<div />
						<div>
							<div
								class="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
							>
								3PM
							</div>
						</div>
						<div />
						<div>
							<div
								class="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
							>
								4PM
							</div>
						</div>
						<div />
						<div>
							<div
								class="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
							>
								5PM
							</div>
						</div>
						<div />
						<div>
							<div
								class="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
							>
								6PM
							</div>
						</div>
						<div />
						<div>
							<div
								class="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
							>
								7PM
							</div>
						</div>
						<div />
						<div>
							<div
								class="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
							>
								8PM
							</div>
						</div>
						<div />
						<div>
							<div
								class="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
							>
								9PM
							</div>
						</div>
						<div />
						<div>
							<div
								class="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
							>
								10PM
							</div>
						</div>
						<div />
						<div>
							<div
								class="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
							>
								11PM
							</div>
						</div>
						<div />
					</div>

					<!--{/* Events * /}-->
					<ol
						class="col-start-1 col-end-2 row-start-1 grid grid-cols-1"
						style="grid-template-rows: 1.75rem repeat(288, minmax(0, 1fr)) auto"
					>
						<li class="relative mt-px flex" style="grid-row: 74 / span 12">
							<button
								class="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-blue-50 p-2 text-xs leading-5 hover:bg-blue-100"
							>
								<p class="order-1 font-semibold text-blue-700">Breakfast</p>
								<p class="text-blue-500 group-hover:text-blue-700">
									<time dateTime="2022-01-22T06:00">6:00 AM</time>
								</p>
							</button>
						</li>
						<li class="relative mt-px flex" style="grid-row: 92 / span 30">
							<button
								class="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-pink-50 p-2 text-xs leading-5 hover:bg-pink-100"
							>
								<p class="order-1 font-semibold text-pink-700">Flight to Paris</p>
								<p class="order-1 text-pink-500 group-hover:text-pink-700">
									John F. Kennedy International Airport
								</p>
								<p class="text-pink-500 group-hover:text-pink-700">
									<time dateTime="2022-01-22T07:30">7:30 AM</time>
								</p>
							</button>
						</li>
						<li class="relative mt-px flex" style="grid-row: 134 / span 18">
							<button
								class="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-indigo-50 p-2 text-xs leading-5 hover:bg-indigo-100"
							>
								<p class="order-1 font-semibold text-indigo-700">Sightseeing</p>
								<p class="order-1 text-indigo-500 group-hover:text-indigo-700">Eiffel Tower</p>
								<p class="text-indigo-500 group-hover:text-indigo-700">
									<time dateTime="2022-01-22T11:00">11:00 AM</time>
								</p>
							</button>
						</li>
					</ol>
				</div>
			</div>
		</div>
		<div class="hidden w-1/2 max-w-md flex-none border-l border-gray-100 px-8 py-10 md:block">
			<div class="flex items-center text-center text-gray-900">
				<button
					class="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
					type="button"
				>
					<span class="sr-only">Previous month</span>
					<Icon aria-hidden="true" class="h-5 w-5" src={ChevronLeft} />
				</button>
				<div class="flex-auto text-sm font-semibold">January 2022</div>
				<button
					class="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
					type="button"
				>
					<span class="sr-only">Next month</span>
					<Icon aria-hidden="true" class="h-5 w-5" src={ChevronRight} />
				</button>
			</div>
			<div class="mt-6 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
				<div>M</div>
				<div>T</div>
				<div>W</div>
				<div>T</div>
				<div>F</div>
				<div>S</div>
				<div>S</div>
			</div>
			<div
				class="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200"
			>
				{#each days as day, dayIdx (day.date)}
					<button
						class={clsx(
							'py-1.5 hover:bg-gray-100 focus:z-10',
							day.isCurrentMonth ? 'bg-white' : 'bg-gray-50',
							(day.isSelected || day.isToday) && 'font-semibold',
							day.isSelected && 'text-white',
							!day.isSelected && day.isCurrentMonth && !day.isToday && 'text-gray-900',
							!day.isSelected && !day.isCurrentMonth && !day.isToday && 'text-gray-400',
							day.isToday && !day.isSelected && 'text-indigo-600',
							dayIdx === 0 && 'rounded-tl-lg',
							dayIdx === 6 && 'rounded-tr-lg',
							dayIdx === days.length - 7 && 'rounded-bl-lg',
							dayIdx === days.length - 1 && 'rounded-br-lg',
						)}
						type="button"
					>
						<time
							class={clsx(
								'mx-auto flex h-7 w-7 items-center justify-center rounded-full',
								day.isSelected && day.isToday && 'bg-indigo-600',
								day.isSelected && !day.isToday && 'bg-gray-900',
							)}
							dateTime={day.date}
						>
							{day.date.split('-').pop().replace(/^0/, '')}
						</time>
					</button>
				{/each}
			</div>
		</div>
	</div>
</div>
