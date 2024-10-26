<script lang="ts">
	import { currentUser } from '$lib/auth/utils';

	import Profile from './profile/Profile.svelte';
</script>

{#if $currentUser}
	<Profile user={$currentUser} />
{/if}
