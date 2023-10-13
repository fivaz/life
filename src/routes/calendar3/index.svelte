<script>
	import { startOfWeek, addDays, format } from 'date-fns';

	let currentDate = new Date();
	let weekStart = startOfWeek(currentDate);
	let daysOfWeek = [];
	for (let i = 0; i < 7; i++) {
		daysOfWeek.push(format(addDays(weekStart, i), 'EEEE'));
	}

	function nextWeek() {
		weekStart = addDays(weekStart, 7);
		updateDaysOfWeek();
	}

	function previousWeek() {
		weekStart = addDays(weekStart, -7);
		updateDaysOfWeek();
	}

	function updateDaysOfWeek() {
		daysOfWeek = [];
		for (let i = 0; i < 7; i++) {
			daysOfWeek.push(format(addDays(weekStart, i), 'EEEE'));
		}
	}
</script>

<div class="calendar">
	<button on:click={previousWeek}>Previous Week</button>
	<div class="week">
		{#each daysOfWeek as day}
			<div>{day}</div>
		{/each}
	</div>
	<div class="week">
		{#each Array.from({ length: 7 }, (_, i) => format(addDays(weekStart, i), 'MM/dd/yyyy')) as day}
			<div>{day}</div>
		{/each}
	</div>
	<button on:click={nextWeek}>Next Week</button>
</div>

<style>
	.calendar {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.week {
		display: flex;
		justify-content: space-around;
		width: 70%;
		margin: 20px 0;
	}
</style>
