<script lang="ts">
	import { setContext } from 'svelte';
	import type { ActionData } from './$types';
	import Calendar from './calendar/Calendar.svelte';

	export let form: ActionData | null = null;

	setContext('form', form);
</script>

<Calendar {form} />
