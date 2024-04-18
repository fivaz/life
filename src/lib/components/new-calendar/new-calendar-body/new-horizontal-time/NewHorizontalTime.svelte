<script lang="ts">
	const timeLabels = [
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
		'11PM',
	];
</script>

<div class="">
	<div class="h-7">
		<slot />
	</div>
	<div class="flex flex-col text-right pr-2 text-xs leading-5 text-gray-400 w-14">
		{#each timeLabels as timeLabel (timeLabel)}
			<div class="h-14">
				<div class="-translate-y-1/2">
					{timeLabel}
				</div>
			</div>
		{/each}
	</div>
</div>
