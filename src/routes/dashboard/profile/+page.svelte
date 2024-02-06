<script lang="ts">
	import { getAuth } from 'firebase/auth';

	import Profile from './profile/Profile.svelte';

	const auth = getAuth();
	const user = auth.currentUser;
</script>

{#if user}
	<Profile {user} />
{/if}
