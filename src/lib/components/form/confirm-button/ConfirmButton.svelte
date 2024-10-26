<script lang="ts">
	import { createDialog } from '$lib/components/dialog/service';
	import Button from '$lib/components/form/button/Button.svelte';
	import { type Snippet } from 'svelte';

	interface Props {
		title?: string;
		message?: string;
		confirmByKey?: string;
		color?: 'indigo' | 'none' | 'red';
		type?: 'button' | 'submit';
		class?: string;
		children?: Snippet;
		confirm: () => void;
	}

	let {
		title = ' Are you sure?',
		message = '',
		confirmByKey,
		color,
		type,
		class: klass = '',
		children,
		confirm,
	}: Props = $props();

	async function submit() {
		if (await createDialog({ message, title })) {
			confirm();
		}
	}
</script>

<svelte:window
	on:keydown={(e) => {
		if (confirmByKey && e.key === confirmByKey) {
			submit();
		}
	}}
/>

<Button class={klass} {color} onclick={submit} {type}>
	{@render children?.()}
</Button>
