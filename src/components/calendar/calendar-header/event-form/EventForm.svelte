<script lang="ts">
	// eslint-disable-next-line import/no-unresolved
	import { enhance } from '$app/forms';
	import { addMinutes, format } from 'date-fns';

	type EventIn = {
		name: string;
		description: string;
		date: string;
		startTime: string;
		endTime: string;
	};

	let eventIn: EventIn = {
		name: '',
		description: '',
		date: format(new Date(), 'yyyy-MM-dd'),
		startTime: format(new Date(), 'hh:mm'),
		endTime: format(addMinutes(new Date(), 15), 'hh:mm')
	};
</script>

<form
	method="POST"
	action="?/add"
	use:enhance
	class="w-[336px] shadow sm:rounded-md sm:overflow-hidden"
>
	<div class="flex flex-col gap-3 px-4 py-5 bg-white sm:p-6">
		<h2 class="text-lg font-medium text-gray-900">Add Event</h2>

		<div>
			<label class="block text-sm font-medium text-gray-700 mb-1">
				Name
				<input
					autocomplete="off"
					name="name"
					bind:value={eventIn.name}
					class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
				/>
			</label>
		</div>

		<div>
			<label class="block text-sm font-medium text-gray-700 mb-1">
				Description
				<textarea
					name="description"
					bind:value={eventIn.description}
					class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
				/>
			</label>
		</div>

		<div>
			<label class="block text-sm font-medium text-gray-700 mb-1">
				Start
				<input
					type="date"
					name="date"
					bind:value={eventIn.date}
					class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
				/>
			</label>
		</div>

		<div class="grid grid-cols-4 gap-3">
			<div class="col-span-2">
				<label class="block text-sm font-medium text-gray-700 mb-1">
					Start time
					<input
						type="time"
						name="startTime"
						class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						bind:value={eventIn.startTime}
					/>
				</label>
			</div>

			<div class="col-span-2">
				<label class="block text-sm font-medium text-gray-700 mb-1">
					End time
					<input
						type="time"
						name="endTime"
						bind:value={eventIn.endTime}
						class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					/>
				</label>
			</div>
		</div>
	</div>

	<div class="flex justify-end px-4 py-3 bg-gray-50 text-right sm:px-6">
		<button
			class="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
			type="submit"
		>
			Add
		</button>
	</div>
</form>
