<script lang="ts">
	import { LoaderCircle } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { clsx } from 'clsx';

	export let loading: boolean;

	let className = '';
	export { className as class };
</script>

{#if loading}
	<div
		class="absolute left-1/2 top-1/2 z-10 flex h-full w-full -translate-x-1/2 -translate-y-1/2 transform items-center justify-center"
	>
		<Icon class={clsx(className, 'animate-spin')} src={LoaderCircle} />
	</div>
{/if}
