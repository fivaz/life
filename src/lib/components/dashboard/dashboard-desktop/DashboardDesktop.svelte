<script lang="ts">
	import SideMenu from '$lib/components/dashboard/side-menu/SideMenu.svelte';
	let className = '';
	export { className as class };
</script>

<SideMenu class="{className} sticky top-0 border-r" />
