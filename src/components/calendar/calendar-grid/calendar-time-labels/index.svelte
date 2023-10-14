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

	const hourInterval = 24;
</script>

<div>
	<div class="h-[80px] sm:h-[56px]" />
	<div class="grid" style="grid-template-rows: repeat({hourInterval}, minmax(3.5rem, 1fr))">
		{#each timeLabels as timeLabel (timeLabel)}
			<div class="w-14 pr-2 text-right text-xs leading-5 text-gray-400">
				{timeLabel}
			</div>
		{/each}
	</div>
</div>

<!--					Events-->
<!--					<ol-->
<!--						class="col-start-1 col-end-2 row-start-1 grid grid-cols-7 sm:grid-cols-7 sm:pr-8"-->
<!--						style="grid-template-rows: 1.75rem repeat(288, minmax(0, 1fr)) auto"-->
<!--					>-->
<!--						{#each events as { label, startTime, endTime } (label)}-->
<!--							<li-->
<!--								class={classnames(-->
<!--									'relative mt-px flex sm:col-start-',-->
<!--									4 + calculateGridColumnPosition(startTime)-->
<!--								)}-->
<!--								style="grid-row: {calculateGridRowPosition(startTime)} / span {calculateGridRowSpan(-->
<!--									startTime,-->
<!--									endTime-->
<!--								)}"-->
<!--							>-->
<!--								<div-->
<!--									class={classnames(-->
<!--										'group absolute inset-1 flex flex-col overflow-y-auto rounded-lg',-->
<!--										getRandomColorClass(),-->
<!--										'p-2 text-xs leading-5 hover:bg-blue-100'-->
<!--									)}-->
<!--								>-->
<!--									<p class="order-1 font-semibold text-gray-700">{label}</p>-->
<!--									<p class="text-gray-500 group-hover:text-gray-700">-->
<!--										<time datetime={startTime}-->
<!--											>{format(parse(startTime, "yyyy-MM-dd'T'HH:mm", new Date()), 'h:mm a')}</time-->
<!--										>-->
<!--									</p>-->
<!--								</div>-->
<!--							</li>-->
<!--						{/each}-->
<!--					</ol>-->
