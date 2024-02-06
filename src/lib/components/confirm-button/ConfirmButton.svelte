<script lang="ts">
	import Button from '$lib/components/button/Button.svelte';
	import { createModal } from '$lib/components/dialog/service';
	import { createEventDispatcher } from 'svelte';

	export let title: string = ' Are you sure?';

	export let color: 'indigo' | 'red' = 'indigo';

	export let type: 'button' | 'submit' | undefined = undefined;

	let dispatch = createEventDispatcher<{ confirm: null }>();

	let className = '';
	export { className as class };
</script>

<Button
	class={className}
	{color}
	on:click={async (e) => {
		e.preventDefault();
		if (await createModal({ title })) {
			dispatch('confirm');
		}
	}}
	{type}
>
	<slot />
</Button>
