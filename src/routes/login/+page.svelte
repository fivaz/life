<script lang="ts">
	import type { ActionData } from './$types';
	import Login from './login/Login.svelte';

	export let form: ActionData | null = null;
</script>

<Login {form} />
