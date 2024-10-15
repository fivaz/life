<script lang="ts">
	import type { Routine } from '$lib/daily/utils';

	import WeekList from '$lib/components/calendar/calendar-body/week-list/WeekList.svelte';
	import TypedCollection from '$lib/components/typed-collection/TypedCollection.svelte';
	import { DbPaTH } from '$lib/consts';
	import { addDays, startOfWeek } from 'date-fns';
	import { SignedIn } from 'sveltefire';

	let weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });

	$: dates = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

	let selectedDate: Date;

	let routinesType: Routine;
</script>

<WeekList bind:selectedDate {dates} />

<SignedIn let:user>
	<TypedCollection
		let:data={routines}
		ref={`${DbPaTH.USERS}/${user.uid}/${DbPaTH.ROUTINES}`}
		type={routinesType}
	></TypedCollection>
</SignedIn>
