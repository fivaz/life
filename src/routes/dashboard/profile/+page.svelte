<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import Profile from './profile/Profile.svelte';

	export let data: PageData;

	export let form: ActionData;
</script>

<Profile {form} user={data.user} />
