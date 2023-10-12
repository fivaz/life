<script lang="ts">
	import { onMount } from 'svelte';
	import { differenceInMinutes, format, getDate, parse } from 'date-fns';
	import classnames from "classnames";

	let container: HTMLDivElement;
	let containerNav: HTMLDivElement;
	let containerOffset: HTMLDivElement;

	let events = [
		{
			label: 'Breakfast',
			startTime: '2023-10-12T06:00',
			endTime: '2023-10-12T07:00'
		},
		{
			label: 'Flight to Paris',
			startTime: '2023-10-12T07:30',
			endTime: '2023-10-12T10:00'
		},
		{
			label: 'Meeting with design team at Disney',
			startTime: '2023-10-15T10:00',
			endTime: '2023-10-15T12:00'
		}
	];

	// Randomize colors for each event
	function getRandomColorClass() {
		const colors = [
			'bg-blue-50',
			'bg-pink-50',
			'bg-yellow-50',
			'bg-green-50',
			'bg-purple-50',
			'bg-red-50',
			'bg-indigo-50'
		];
		return colors[Math.floor(Math.random() * colors.length)];
	}

	function calculateGridRowSpan(startTime: string, endTime: string): number {
		const start = parse(startTime, "yyyy-MM-dd'T'HH:mm", new Date());
		const end = parse(endTime, "yyyy-MM-dd'T'HH:mm", new Date());
		const minutesDifference = differenceInMinutes(end, start);
		return Math.ceil(minutesDifference / 15); // Each quarter-hour corresponds to 1 grid row
	}

	function calculateGridRowPosition(startTime: string): number {
		const start = parse(startTime, "yyyy-MM-dd'T'HH:mm", new Date());
		const hours = start.getHours();
		return 74 + hours * 4;
	}

	function calculateGridColumnPosition(startTime: string): number {
		const start = parse(startTime, "yyyy-MM-dd'T'HH:mm", new Date());
		const dayOfMonth = getDate(start);
		return dayOfMonth - 10; // Adjust the column based on the day of the month
	}

	let daysAndDates = [
		{ day: 'Mon', dayShort: 'M', date: 10 },
		{ day: 'Tue', dayShort: 'T', date: 11 },
		{ day: 'Wed', dayShort: 'W', date: 12 },
		{ day: 'Thu', dayShort: 'T', date: 13 },
		{ day: 'Fri', dayShort: 'F', date: 14 },
		{ day: 'Sat', dayShort: 'S', date: 15 },
		{ day: 'Sun', dayShort: 'S', date: 16 }
	];

	let timeLabels = [
		'12AM',
		'1AM',
		'2AM',
		'3AM',
		'4AM',
		'5AM',
		'6AM',
		'7AM',
		'8AM',
		'9AM',
		'10AM',
		'11AM',
		'12PM',
		'1PM',
		'2PM',
		'3PM',
		'4PM',
		'5PM',
		'6PM',
		'7PM',
		'8PM',
		'9PM',
		'10PM',
		'11PM'
	];

	const currentDate = new Date();

	onMount(() => {
		// Set the container scroll position based on the current time.
		const currentMinute = currentDate.getHours() * 60;

		console.log(currentMinute);

		console.log(
			((container.scrollHeight - containerNav.offsetHeight - containerOffset.offsetHeight) *
				currentMinute) /
				1440
		);

		container.scrollTop =
			((container.scrollHeight - containerNav.offsetHeight - containerOffset.offsetHeight) *
				currentMinute) /
			1440;
	});
</script>

<div class="flex h-full flex-col">
	<header class="flex flex-none items-center justify-between border-b border-gray-200 py-4 px-6">
		<h1 class="text-lg font-semibold text-gray-900">
			<time datetime="2022-01">January 2022</time>
		</h1>
		<div class="flex items-center">
			<div class="flex items-center rounded-md shadow-sm md:items-stretch">
				<button
					type="button"
					class="flex items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-white py-2 pl-3 pr-4 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
				>
					<span class="sr-only">Previous month</span>
					<span>ChevronLeftIcon</span>
				</button>
				<button
					type="button"
					class="hidden border-t border-b border-gray-300 bg-white px-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:relative md:block"
					>Today</button
				>
				<span class="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
				<button
					type="button"
					class="flex items-center justify-center rounded-r-md border border-l-0 border-gray-300 bg-white py-2 pl-4 pr-3 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
				>
					<span class="sr-only">Next month</span>
					<span>ChevronRightIcon</span>
				</button>
			</div>
			<div class="hidden md:ml-4 md:flex md:items-center">
				<div>menu</div>
				<div class="ml-6 h-6 w-px bg-gray-300" />
				<button
					type="button"
					class="ml-6 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
					>Add event</button
				>
			</div>
			<div>menu</div>
		</div>
	</header>
	<div
		bind:this={container}
		id="test"
		class="isolate flex flex-auto flex-col overflow-auto bg-white"
	>
		<div style="width: 165%" class="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full">
			<div
				bind:this={containerNav}
				class="sticky top-0 z-30 flex-none bg-white shadow ring-1 ring-black ring-opacity-5 sm:pr-8"
			>
				<div class="grid grid-cols-7 text-sm leading-6 text-gray-500 sm:hidden">
					{#each daysAndDates as { day, date } (day)}
						<button type="button" class="flex flex-col items-center pt-2 pb-3">
							{day}
							{#if getDate(currentDate) === date}
								<span
									class="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white"
								>
									{date}
								</span>
							{:else}
								<span
									class="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900"
									>{date}
								</span>
							{/if}
						</button>
					{/each}
				</div>

				<div
					class="-mr-px hidden grid-cols-7 divide-x divide-gray-100 border-r border-gray-100 text-sm leading-6 text-gray-500 sm:grid"
				>
					<div class="col-end-1 w-14" />
					{#each daysAndDates as { day, date } (day)}
						<div class="flex items-center justify-center py-3">
							<span>
								{day}
								{#if getDate(currentDate) === date}
									<span
										class="items-center justify-center rounded-full bg-indigo-600 font-semibold text-white ml-1.5 flex h-8 w-8"
										>{date}
									</span>
								{:else}
									<span class="items-center justify-center font-semibold text-gray-900">{date}</span
									>
								{/if}
							</span>
						</div>
					{/each}
				</div>
			</div>
			<div class="flex flex-auto">
				<div class="sticky left-0 z-10 w-14 flex-none bg-white ring-1 ring-gray-100" />
				<div class="grid flex-auto grid-cols-1 grid-rows-1">
					<!-- Horizontal lines -->
					<div
						class="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
						style="grid-template-rows: repeat(48, minmax(3.5rem, 1fr))"
					>
						<div bind:this={containerOffset} class="row-end-1 h-7" />
						{#each timeLabels as timeLabel (timeLabel)}
							<div>
								<div
									class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
								>
									{timeLabel}
								</div>
							</div>
							<div />
						{/each}
					</div>

					<!-- Vertical lines -->
					<div
						class="col-start-1 col-end-2 row-start-1 hidden grid-cols-7 grid-rows-1 divide-x divide-gray-100 sm:grid sm:grid-cols-7"
					>
						<div class="col-start-1 row-span-full" />
						<div class="col-start-2 row-span-full" />
						<div class="col-start-3 row-span-full" />
						<div class="col-start-4 row-span-full" />
						<div class="col-start-5 row-span-full" />
						<div class="col-start-6 row-span-full" />
						<div class="col-start-7 row-span-full" />
						<div class="col-start-8 row-span-full w-8" />
					</div>

					Eventse
					<ol class="col-start-1 col-end-2 row-start-1 grid grid-cols-7 sm:grid-cols-7 sm:pr-8" style="grid-template-rows: 1.75rem repeat(288, minmax(0, 1fr)) auto">
						{#each events as { label, startTime, endTime } (label)}
							{#if label === "Breakfast"}
								<li class={classnames("relative mt-px flex sm:col-start-", 4 + calculateGridColumnPosition(startTime))} style="grid-row: {calculateGridRowPosition(startTime)} / span {calculateGridRowSpan(startTime, endTime)}">
							{:else if label === "Flight to Paris"}
								<li class={classnames("relative mt-px flex sm:col-start-", 4 + calculateGridColumnPosition(startTime))} style="grid-row: {calculateGridRowPosition(startTime)} / span {calculateGridRowSpan(startTime, endTime)}">
							{:else if label === "Meeting with design team at Disney"}
								<li class={classnames("relative mt-px flex sm:col-start-", 4 + calculateGridColumnPosition(startTime))} style="grid-row: {calculateGridRowPosition(startTime)} / span {calculateGridRowSpan(startTime, endTime)}">
							{/if}
							<div class={classnames("group absolute inset-1 flex flex-col overflow-y-auto rounded-lg", getRandomColorClass(), "p-2 text-xs leading-5 hover:bg-blue-100")}>
								<p class="order-1 font-semibold text-gray-700">{label}</p>
								<p class="text-gray-500 group-hover:text-gray-700">
									<time datetime={startTime}>{format(parse(startTime, "yyyy-MM-dd'T'HH:mm", new Date()), "h:mm a")}</time>
								</p>
							</div>
							</li>
						{/each}
					</ol>

				</div>
			</div>
		</div>
	</div>
</div>
