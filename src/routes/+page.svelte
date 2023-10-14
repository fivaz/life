<script lang="ts">
	import { events } from '$lib/seed/events';
	import Calendar from '../components/calendar/index.svelte';

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
</script>

<Calendar {events} />
