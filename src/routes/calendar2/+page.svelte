<script lang="ts">
	import { onMount } from 'svelte';
	import {
		addDays,
		addMonths,
		endOfMonth,
		format,
		isSameDay,
		isSameMonth,
		startOfMonth
	} from 'date-fns';

	// Define your events data here
	const events: { date: Date; title: string }[] = [
		{ date: new Date(), title: 'Event 1' },
		{ date: addDays(new Date(), 5), title: 'Event 2' }
		// Add more events as needed
	];

	// Initialize calendar data
	let currentMonth: Date;
	let daysInMonth: Date[] = [];

	onMount(() => {
		currentMonth = new Date();
		updateCalendar();
	});

	function updateCalendar() {
		const start = startOfMonth(currentMonth);
		const end = endOfMonth(currentMonth);
		daysInMonth = [];

		for (let day = start; day <= end; day = addDays(day, 1)) {
			daysInMonth.push(day);
		}
	}
</script>

<!-- Calendar HTML -->
<div class="calendar">
	<div class="month-header">
		<button on:click={() => (currentMonth = addMonths(currentMonth, -1))}>&lt;</button>
		<h2>{currentMonth}</h2>
		<button on:click={() => (currentMonth = addMonths(currentMonth, 1))}>&gt;</button>
	</div>
	<div class="days">
		{#each daysInMonth as day (day)}
			<div class="day">
				<span>{format(day, 'd')}</span>
				{#each events as event (event.date)}
					{#if isSameDay(event.date, day)}
						<div class="event">{event.title}</div>
					{/if}
				{/each}
			</div>
		{/each}
	</div>
</div>

<style>
	.calendar {
		font-family: Arial, sans-serif;
		background-color: #fff;
		border: 1px solid #ccc;
		border-radius: 5px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		max-width: 300px;
		margin: 0 auto;
		padding: 10px;
	}

	.month-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.month-header button {
		background: none;
		border: none;
		font-size: 20px;
		cursor: pointer;
		transition: transform 0.2s;
	}

	.month-header button:hover {
		transform: scale(1.2);
	}

	.month-header h2 {
		font-size: 20px;
		font-weight: bold;
		margin: 0;
	}

	.days {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		grid-gap: 5px;
		margin-top: 10px;
	}

	.day {
		text-align: center;
		padding: 10px;
		border: 1px solid #eee;
		border-radius: 5px;
	}

	.day span {
		display: block;
		font-size: 16px;
		font-weight: bold;
		margin-bottom: 5px;
	}

	.event {
		background-color: #007bff;
		color: #fff;
		padding: 2px 5px;
		border-radius: 3px;
		margin-top: 2px;
		font-size: 12px;
	}
</style>
