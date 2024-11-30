<script lang="ts">
	import '../app.css';

	import { setDefaultOptions } from 'date-fns';

	// set it for all
	setDefaultOptions({ weekStartsOn: 1 });

	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

{@render children?.()}
