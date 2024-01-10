<script lang="ts">
	import { page } from '$app/stores';
	import { categories } from '$lib/category/store.js';
	import Dashboard from '$lib/components/dashboard/Dashboard.svelte';
	import Dialog from '$lib/components/dialog/Dialog.svelte';
	import { modal } from '$lib/components/dialog/service';
	import { tasks } from '$lib/task/store.js';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	tasks.set(data.tasks);
	categories.set(data.categories);
</script>

<Dashboard user={$page.data.session?.user}>
	<slot />
</Dashboard>

<Dialog
	show={$modal.show}
	title={$modal.title}
	message={$modal.message}
	confirmText={$modal.confirmText}
	cancelText={$modal.cancelText}
	resolve={$modal.resolve}
/>
