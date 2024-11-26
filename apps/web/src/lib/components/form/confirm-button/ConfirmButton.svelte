<script lang="ts">
	import { Button } from '@life/ui';
	import type { Snippet } from 'svelte';

	import { createDialog } from '$lib/components/dialog/service.svelte';

	interface Props {
		title?: string;
		message?: string;
		confirmByKey?: string;
		color?: 'indigo' | 'none' | 'red';
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
