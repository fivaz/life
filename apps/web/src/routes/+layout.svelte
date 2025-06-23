<script lang="ts">
	import '../app.css';

	import { setDefaultOptions } from 'date-fns';

	import { darkMode } from '$lib/utils.svelte';

	// set it for all
	setDefaultOptions({ weekStartsOn: 1 });

	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	darkMode.value = getDarkMode();

	function getDarkMode() {
		// On page load or when changing themes, best to add inline in `head` to avoid FOUC
		return (
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
		);
	}

	// Watch for changes in isDark and update localStorage + class
	$effect(() => {
		localStorage.theme = darkMode.value ? 'dark' : 'light';
		document.documentElement.classList.toggle('dark', darkMode.value);
	});
</script>

<svelte:head>
	<style>
		/* Critical CSS to avoid flash */
		html {
			background-color: oklch(0.985 0.002 247.839); /* Light mode default */
		}
		html.dark {
			background-color: oklch(0.21 0.034 264.665); /* Tailwind gray-900 */
		}
	</style>
</svelte:head>

{@render children?.()}
