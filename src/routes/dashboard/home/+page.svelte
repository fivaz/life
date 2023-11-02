<script lang="ts">
	import type { ActionData } from './$types';
	import Calendar from './calendar/Calendar.svelte';

	export let form: ActionData | null = null;
</script>

<Calendar {form} />
