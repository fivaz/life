<script lang="ts">
	import Register from '$lib/components/register/Register.svelte';
	import type { ActionData } from '../../../.svelte-kit/types/src/routes/dashboard/home/$types';

	export let form: ActionData | null = null;
</script>

<div class="bg-gray-50">
	<Register {form} />
</div>
