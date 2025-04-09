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
	<path
		d="M32 9a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v30a3 3 0 0 1-3 3h-4a3 3 0 0 1-3-3zM19 21a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v18a3 3 0 0 1-3 3h-4a3 3 0 0 1-3-3zM9 30a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h4a3 3 0 0 0 3-3v-6a3 3 0 0 0-3-3z"
		fill="currentColor"
	/>
</svg>
