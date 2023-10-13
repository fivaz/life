<script lang="ts">
	let containerOffset: HTMLDivElement;

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

<div class="flex flex-auto">
	<!--	<div class="sticky left-0 z-10 w-14 flex-none bg-white ring-1 ring-gray-100" />-->
	<div class="flex flex-col flex-auto">
		<!-- Horizontal lines -->
		<div class="divide-y divide-gray-100">
			<div bind:this={containerOffset} class="row-end-1 h-[56px]" />
			{#each timeLabels as timeLabel (timeLabel)}
				<div class="h-[3.5rem]">
					<div class="w-14 pr-2 text-right text-xs leading-5 text-gray-400">
						{timeLabel}
					</div>
				</div>
			{/each}
		</div>

		<!-- Vertical lines -->
		<!--		<div-->
		<!--			class="col-start-1 col-end-2 row-start-1 hidden grid-cols-7 grid-rows-1 divide-x divide-gray-100 sm:grid sm:grid-cols-7"-->
		<!--		>-->
		<!--			<div class="col-start-1 row-span-full" />-->
		<!--			<div class="col-start-2 row-span-full" />-->
		<!--			<div class="col-start-3 row-span-full" />-->
		<!--			<div class="col-start-4 row-span-full" />-->
		<!--			<div class="col-start-5 row-span-full" />-->
		<!--			<div class="col-start-6 row-span-full" />-->
		<!--			<div class="col-start-7 row-span-full" />-->
		<!--			<div class="col-start-8 row-span-full w-8" />-->
		<!--		</div>-->

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
	</div>
</div>
