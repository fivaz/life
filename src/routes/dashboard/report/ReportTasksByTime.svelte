<script lang="ts">
	import type { AnyTask } from '$lib/task/utils.js';
	
import { DATE } from '$lib/consts.js';
	import { getTaskDateTime } from '$lib/task/time-utils.js';
	import {
		CategoryScale,
		Chart as ChartJS,
		Legend,
		LineElement,
		LinearScale,
		PointElement,
		Title,
		Tooltip,
	} from 'chart.js';
	import { eachDayOfInterval, format, isBefore, isEqual, parseISO } from 'date-fns';
	
ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale);

	function getUncompletedTasksByDate(tasks: AnyTask[]): UncompletedTasksByDate {
		const uncompletedTasksByDate: UncompletedTasksByDate = {};

		tasks.forEach((task) => {
			const createdAt = parseISO(task.createdAt);
			const endAt = task.isDone ? getTaskDateTime(task) : new Date();

			const dateRange = eachDayOfInterval({ end: endAt, start: createdAt });

			dateRange.forEach((date) => {
				const dateString = format(date, DATE);

				if (!uncompletedTasksByDate[dateString]) {
					uncompletedTasksByDate[dateString] = 0;
				}

				// Increment the count for the specific date
				if (!task.isDone || isBefore(date, endAt) || isEqual(date, endAt)) {
					uncompletedTasksByDate[dateString]++;
				}
			});
		});

		return uncompletedTasksByDate;
	}

	type UncompletedTasksByDate = {
		[key: string]: number;
	};

	export let tasks: AnyTask[];

	$: uncompletedTasksByDate = getUncompletedTasksByDate(tasks);

	// const data = {
	// 	datasets: [
	// 		{
	// 			borderColor: 'rgb(75, 192, 192)',
	// 			data: Object.values(uncompletedTasksByDate),
	// 			fill: false,
	// 			label: 'Tasks by time',
	// 			tension: 0.1,
	// 		},
	// 	],
	// 	labels: Object.keys(uncompletedTasksByDate),
	// };
</script>

<div>
	<pre>{tasks.length}</pre>
	<pre>{JSON.stringify(uncompletedTasksByDate, null, 2)}</pre>
	<!--	<Line {data} options={{ responsive: true }} />-->
</div>
