<script lang="ts">
</script>

<ol
	class="col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:grid-cols-7 sm:pr-8"
	style="grid-template-rows: 1.75rem repeat(288, minmax(0, 1fr)) auto"
>
	<li class="relative mt-px flex sm:col-start-3" style="grid-row: 74 / span 12">
		<button
			class="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-blue-50 p-2 text-xs leading-5 hover:bg-blue-100"
		>
			<p class="order-1 font-semibold text-blue-700">Breakfast</p>
			<p class="text-blue-500 group-hover:text-blue-700">
				<time dateTime="2022-01-12T06:00">6:00 AM</time>
			</p>
		</button>
	</li>
	<li class="relative mt-px flex sm:col-start-3" style="grid-row: 92 / span 30">
		<button
			class="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-pink-50 p-2 text-xs leading-5 hover:bg-pink-100"
		>
			<p class="order-1 font-semibold text-pink-700">Flight to Paris</p>
			<p class="text-pink-500 group-hover:text-pink-700">
				<time dateTime="2022-01-12T07:30">7:30 AM</time>
			</p>
		</button>
	</li>
	<li class="relative mt-px hidden sm:col-start-6 sm:flex" style="grid-row: 122 / span 24">
		<button
			class="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-gray-100 p-2 text-xs leading-5 hover:bg-gray-200"
		>
			<p class="order-1 font-semibold text-gray-700">Meeting with design team at Disney</p>
			<p class="text-gray-500 group-hover:text-gray-700">
				<time dateTime="2022-01-15T10:00">10:00 AM</time>
			</p>
		</button>
	</li>
</ol>
