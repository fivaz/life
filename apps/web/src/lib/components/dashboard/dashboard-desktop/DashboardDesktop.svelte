<script lang="ts">
	import SideMenu from '$lib/components/dashboard/side-menu/SideMenu.svelte';

	interface Props {
		class?: string;
	}

	let { class: klass = '' }: Props = $props();
</script>

<SideMenu class="{klass} sticky top-0" />
