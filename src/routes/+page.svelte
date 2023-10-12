<script lang="ts">
	import { onMount } from 'svelte';
	import { differenceInMinutes, format, getDate, parse } from 'date-fns';
	import Calendar from '../components/calendar/index.svelte';
	import CalendarGrid from '../components/calendar-grid/index.svelte';
	import classnames from 'classnames';

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

	// onMount(() => {
	// 	// Set the container scroll position based on the current time.
	// 	const currentMinute = currentDate.getHours() * 60;
	//
	// 	console.log(currentMinute);
	//
	// 	console.log(
	// 		((container.scrollHeight - containerNav.offsetHeight - containerOffset.offsetHeight) *
	// 			currentMinute) /
	// 			1440
	// 	);
	//
	// 	container.scrollTop =
	// 		((container.scrollHeight - containerNav.offsetHeight - containerOffset.offsetHeight) *
	// 			currentMinute) /
	// 		1440;
	// });
</script>

<Calendar />
