import type { TEvent } from '$lib';
import { formatISO } from 'date-fns';

function getTodayAtTime(time: string): string {
	// Parse the hour and minute from the input time
	const [hour, minute] = time.split(':').map(Number);

	// Get today's date at the given hour and minute
	const date = new Date().setHours(hour, minute, 0, 0);

	// Format the date as an ISO 8601 string
	return formatISO(date);
}

// Usage:
console.log(getTodayAtTime('06:30')); // Outputs today's date at 06:30 in ISO format

export const events: TEvent[] = [
	{
		label: 'Breakfast',
		startTime: getTodayAtTime('07:00'),
		endTime: getTodayAtTime('07:45')
	},
	{
		label: 'Flight to Paris',
		startTime: '2023-10-12T07:30',
		endTime: '2023-10-12T10:00'
	},
	{
		label: 'Meeting with design team at Disney',
		startTime: getTodayAtTime('10:15'),
		endTime: getTodayAtTime('12:20')
	}
];
