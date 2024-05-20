<script lang="ts">
	import type { IconSource } from '@steeze-ui/svelte-icon';

	import { Icon } from '@steeze-ui/svelte-icon';
	import { clsx } from 'clsx';
	
let className = '';
	export { className as class };

	export let src: IconSource;

	export let theme: string | undefined;
</script>

<Icon class={clsx(className)} {src} theme={theme || 'solid'} />
