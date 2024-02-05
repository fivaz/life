<script lang="ts">
	import { Loader2 } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import classnames from 'classnames';

	export let loading: boolean;

	let className = '';
	export { className as class };
</script>

{#if loading}
	<div
		class="absolute flex justify-center items-center w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
	>
		<Icon class={classnames(className, 'animate-spin')} src={Loader2} />
	</div>
{/if}
