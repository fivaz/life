<script lang="ts">
	import Calendar from '../components/calendar/index.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Calendar events={data.events} />
