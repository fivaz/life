<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ChevronLeft, ChevronRight } from '@steeze-ui/heroicons';

	import { addDays, format } from 'date-fns';

	export let currentDate: Date;
	export let weekStart: Date;

	function nextWeek() {
		console.log('nextWeek');
		weekStart = addDays(weekStart, 7);
		console.log(weekStart);
	}

	function previousWeek() {
		console.log('previousWeek');
		weekStart = addDays(weekStart, -7);
		console.log(weekStart);
	}
</script>

<header class="flex flex-none items-center justify-between border-b border-gray-200 py-4 px-6">
	<h1 class="text-lg font-semibold text-gray-900">
		<time datetime="2023-10">{format(currentDate, 'MMMM yyyy')}</time>
	</h1>
	<div class="flex items-center">
		<div class="flex items-center rounded-md shadow-sm md:items-stretch">
			<button
				on:click={previousWeek}
				type="button"
				class="flex items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-white py-2 pl-3 pr-4 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
			>
				<span class="sr-only">Previous week</span>
				<Icon src={ChevronLeft} theme="solid" class="h-5 w-5" />
			</button>
			<button
				type="button"
				class="hidden border-t border-b border-gray-300 bg-white px-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:relative md:block"
				>Today
			</button>
			<span class="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
			<button
				on:click={nextWeek}
				type="button"
				class="flex items-center justify-center rounded-r-md border border-l-0 border-gray-300 bg-white py-2 pl-4 pr-3 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
			>
				<span class="sr-only">Next week</span>
				<Icon src={ChevronRight} theme="solid" class="h-5 w-5" />
			</button>
		</div>
		<div class="hidden md:ml-4 md:flex md:items-center">
			<div>menu</div>
			<div class="ml-6 h-6 w-px bg-gray-300" />
			<button
				type="button"
				class="ml-6 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
			>
				Add event
			</button>
		</div>
		<div>menu</div>
	</div>
</header>
