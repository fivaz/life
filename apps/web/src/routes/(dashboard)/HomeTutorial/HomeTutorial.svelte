<script lang="ts">
	import { onMount } from 'svelte';
	import introJs from 'intro.js';
	import { getSteps, resetData } from './service';
	import { currentUser } from '$lib/user/user.utils.svelte';
	import TutorialDialog from '$lib/components/tutorial-dialog/TutorialDialog.svelte';

	// $effect(() => {
	// 	if(currentUser.uid){
	// 		resetData();
	// 	}
	// })

	let showTutorial = $state(true);

	function close() {
		showTutorial = false;
	}

	export const tutorialSteps = [
		{
			gif: '/tutorial/create-event.gif',
			title: 'Create an Event',
			text: 'Click anywhere on the calendar to quickly add an event. You can customize its title, duration, and more.',
		},
		{
			gif: '/tutorial/resize-drag-event.gif',
			title: 'Move or Resize Events',
			text: 'Drag events to change their time or day. Resize them to adjust the duration easily.',
		},
		{
			gif: '/tutorial/recurring-event.gif',
			title: 'Create Recurring Events',
			text: 'Set events to repeat daily, weekly, or monthly so you never forget regular activities.',
		},
		{
			gif: '/tutorial/event-categories.gif',
			title: 'Categorize Events with Colors',
			text: 'Assign categories like Work, Personal, or Fitness using custom colors to keep your calendar organized.',
		},
		{
			gif: '/tutorial/goals-and-tasks.gif',
			title: 'Track Goals with Tasks',
			text: 'Create goals and break them into tasks. As you complete tasks, your goal progress will be updated.',
		},
		{
			gif: '/tutorial/organize-by-date.gif',
			title: 'Organize Everything by Date',
			text: 'See all your events and tasks in one place. Drag and drop them to the right day and time.',
		},
		{
			gif: '/tutorial/task-progress-chart.gif',
			title: 'Visualize Your Progress',
			text: 'Check how many tasks you’ve completed over time with progress charts to stay motivated.',
		},
		{
			gif: '/tutorial/routines-and-habits.gif',
			title: 'Build Routines & Habits',
			text: 'Set up daily routines and track your consistency. Good habits start here.',
		},
	];

</script>

{#if showTutorial}
	<TutorialDialog steps={tutorialSteps} {close} />
{/if}
