<script lang="ts">
	import type { PageData } from './$types';
	import Profile from './profile/Profile.svelte';

	export let data: PageData;
</script>

<Profile user={{ name: data.name, username: data.username }} />
