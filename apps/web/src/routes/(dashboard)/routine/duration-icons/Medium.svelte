<script lang="ts">
	interface Props {
		class?: string;
	}

	let { class: klass }: Props = $props();
</script>

<svg
	class="{klass} text-indigo-600 group-hover:text-indigo-100"
	viewBox="0 0 48 48"
	xmlns="http://www.w3.org/2000/svg"
>
	<g fill="currentColor">
		<path
			d="M19 21a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v18a3 3 0 0 1-3 3h-4a3 3 0 0 1-3-3zM6 33a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3z"
		/>
		<path
			clip-rule="evenodd"
			d="M32 9a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v30a3 3 0 0 1-3 3h-4a3 3 0 0 1-3-3zm3-1a1 1 0 0 0-1 1v30a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1z"
			fill-rule="evenodd"
		/>
	</g>
</svg>
