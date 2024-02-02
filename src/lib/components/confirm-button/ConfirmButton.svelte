<script lang="ts">
	import Button from '$lib/components/button/Button.svelte';
	import { createModal } from '$lib/components/dialog/service';

	export let title: string;

	export let form: HTMLFormElement;

	export let formaction: string | undefined = undefined;

	export let color: 'indigo' | 'red' = 'indigo';
</script>

<!--TODO implement this later-->
<Button
	on:click={async (e) => {
		e.preventDefault();
		if (await createModal({ title })) {
			if (form) {
				if (formaction) {
					form.action = formaction;
				}
				form.requestSubmit();
			}
		}
	}}
	{formaction}
	{color}
>
	<slot />
</Button>
