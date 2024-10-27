<script lang="ts">
	import { LoaderCircle } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';

	interface Props {
		loading: boolean;
		class?: string;
	}

	let { loading, class: klass }: Props = $props();
</script>

{#if loading}
	<div
		class="absolute left-1/2 top-1/2 z-10 flex h-full w-full -translate-x-1/2 -translate-y-1/2 transform items-center justify-center"
	>
		<Icon class="{klass} animate-spin" src={LoaderCircle} />
	</div>
{/if}
