<script lang="ts">
	import { PUBLIC_COMMIT_HASH } from '$env/static/public';
	import { tooltip } from '$lib/components/tooltip/tooltip.action';

	interface Props {
		class?: string;
	}

	let { class: klass }: Props = $props();
</script>

<svg
	class={klass}
	viewBox="0 0 24 24"
	xmlns="http://www.w3.org/2000/svg"
	use:tooltip={`current commit: ${PUBLIC_COMMIT_HASH}`}
>
	<path
		d="M13.5 21H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5m-4-9v4M8 3v4m-4 4h16m-1 5l-2 3h4l-2 3"
		fill="none"
		stroke="currentColor"
		stroke-linecap="round"
		stroke-linejoin="round"
		stroke-width="2"
	/>
</svg>
