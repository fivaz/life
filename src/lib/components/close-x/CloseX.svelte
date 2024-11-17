<script lang="ts">
	import { XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	interface Props {
		close: () => void;
	}

	let { close }: Props = $props();
</script>

<button
	class="inline-flex rounded-md p-1.5 pl-2 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-gray-50"
	onclick={close}
	type="button"
>
	<span class="sr-only">Dismiss</span>
	<Icon aria-hidden="true" class="h-5 w-5" src={XMark} />
</button>
