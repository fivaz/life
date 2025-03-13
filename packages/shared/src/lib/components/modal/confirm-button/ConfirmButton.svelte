<script lang="ts">
	import type { Snippet } from 'svelte';

	import Button from '$lib/components/button/Button.svelte';
	import { createDialog } from '$lib/components/dialog/service.svelte.js';

	interface Props {
		title?: string;
		message?: string;
		confirmByKey?: string;
		color?: 'indigo' | 'white' | 'red';
		type?: 'button' | 'submit';
		class?: string;
		children: Snippet;
		confirm: () => void;
	}

	let {
		title = ' Are you sure?',
		message = '',
		confirmByKey,
		color,
		type,
		class: klass,
		children,
		confirm,
	}: Props = $props();

	async function submit() {
		if (await createDialog({ message, title })) {
			confirm();
		}
	}

	function isInputFocused() {
		const activeElement = document.activeElement;
		return (
			activeElement &&
			(activeElement.tagName === 'INPUT' ||
				activeElement.tagName === 'TEXTAREA' ||
				activeElement.tagName === 'SELECT' ||
				activeElement.getAttribute('contenteditable') === 'true')
		);
	}
</script>

<svelte:window
	onkeydown={(e) => {
		if (!isInputFocused() && confirmByKey && e.key === confirmByKey) {
			submit();
		}
	}}
/>

<Button class={klass} {color} onclick={submit} {type}>
	{@render children()}
</Button>
