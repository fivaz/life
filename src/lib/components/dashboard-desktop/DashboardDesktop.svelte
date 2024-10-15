<script lang="ts">
	import SideMenu from '$lib/components/side-menu/SideMenu.svelte';
	let className = '';
	export { className as class };
</script>

<header class={className}>
	<SideMenu />
</header>
