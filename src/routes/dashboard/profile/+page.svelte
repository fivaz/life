<script lang="ts">
	import { currentUser } from '$lib/auth/utils.svelte';

	import Profile from './profile/Profile.svelte';
</script>

{#if currentUser.uid}
	<Profile user={currentUser} />
{/if}
