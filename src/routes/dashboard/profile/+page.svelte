<script lang="ts">
	import { currentUser } from '$lib/user/utils';

	import Profile from './profile/Profile.svelte';
</script>

{#if $currentUser}
	<Profile user={$currentUser} />
{/if}
