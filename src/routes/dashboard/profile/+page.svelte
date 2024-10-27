<script lang="ts">
	import { currentUser } from '$lib/auth/utils.svelte';

	import Profile from './profile/Profile.svelte';
</script>

{#if currentUser.value}
	<Profile user={currentUser.value} />
{/if}
