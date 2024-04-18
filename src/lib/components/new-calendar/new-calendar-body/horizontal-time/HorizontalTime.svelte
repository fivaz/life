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

<div
	class="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
	style="grid-template-rows: repeat(48, minmax(3.5rem, 1fr))"
>
	<slot class="row-end-1 h-7" />
	{#each timeLabels as timeLabel (timeLabel)}
		<div>
			<div
				class="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
			>
				{timeLabel}
			</div>
		</div>
		<div />
	{/each}
</div>
