<script lang="ts">
	import type { Category } from '$lib/category/utils';
	import type { AnyEvent } from '$lib/task/utils';

	import Modal from '$lib/components/modal/Modal.svelte';
	import TaskForm from '$lib/components/task-form/TaskForm.svelte';
	import TypedCollection from '$lib/components/typed-collection/TypedCollection.svelte';
	import { buildEmptyEvent, buildEventWithTime } from '$lib/task/build-utils';
	import { startOfWeek } from 'date-fns';
	import { SignedIn } from 'sveltefire';

	import NewCalendarBody from './new-calendar-body/NewCalendarBody.svelte';
	import NewCalendarHeader from './new-calendar-header/NewCalendarHeader.svelte';

	let targetDate: string | undefined = undefined;

	let weekStart = startOfWeek(new Date());

	let showForm = false;

	let editingEvent: AnyEvent = buildEmptyEvent([]);

	let categoryType: Category;
</script>

<SignedIn let:user>
	<TypedCollection let:data={categories} ref={`users/${user.uid}/categories`} type={categoryType}>
		<div class="flex h-full flex-col">
			<NewCalendarHeader
				bind:weekStart
				on:create={() => {
					showForm = true;
					editingEvent = buildEmptyEvent(categories);
				}}
			/>
			<NewCalendarBody
				on:create={(e) => {
					showForm = true;
					editingEvent = buildEventWithTime(categories, e.detail.date, e.detail.cellNumber);
				}}
				on:edit={(e) => {
					showForm = true;
					targetDate = e.detail.targetDate;
					editingEvent = e.detail.event;
				}}
				{weekStart}
			/>
			<Modal on:close={() => (showForm = false)} show={showForm}>
				<TaskForm
					{categories}
					on:close={() => (showForm = false)}
					{targetDate}
					task={editingEvent}
					userId={user.uid}
				/>
			</Modal>
		</div>
	</TypedCollection>
</SignedIn>
