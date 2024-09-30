<script lang="ts">
	import Button from '$lib/components/button/Button.svelte';
	import { createDialog } from '$lib/components/dialog/service';
	import { createEventDispatcher } from 'svelte';

	export let title = ' Are you sure?';
	export let message = '';
	export let confirmByKey: string | undefined;

	export let color: 'indigo' | 'none' | 'red' | undefined = undefined;

	export let type: 'button' | 'submit' | undefined = undefined;

	let dispatch = createEventDispatcher<{ confirm: null }>();

	let className = '';
	export { className as class };

	async function submit() {
		if (await createDialog({ message, title })) {
			dispatch('confirm');
		}
	}
</script>

<svelte:window
	on:keydown={async (e) => {
		if (confirmByKey && e.key === confirmByKey) {
			await submit();
		}
	}}
/>

<Button
	class={className}
	{color}
	on:click={async (e) => {
		e.preventDefault();
		await submit();
	}}
	{type}
>
	<slot />
</Button>
