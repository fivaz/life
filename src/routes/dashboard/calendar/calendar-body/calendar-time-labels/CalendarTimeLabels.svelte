<script lang="ts">
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
</script>

<div class="divide-y">
	<div class="h-[80px] sm:h-[56px]" />
	<div
		class="grid text-right text-xs leading-5 text-gray-400"
		style="grid-template-rows: repeat({timeLabels.length * 2}, minmax(3.5rem, 1fr))"
	>
		{#each timeLabels as timeLabel (timeLabel)}
			<div class="sm:block hidden w-14 pr-2 row-span-2">
				{timeLabel}
			</div>
			<div class="block sm:hidden w-7 pr-2 row-span-2">
				{timeLabel.replace(/\D/g, '')}
			</div>
		{/each}
	</div>
</div>
