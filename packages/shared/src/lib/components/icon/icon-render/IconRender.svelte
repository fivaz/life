<script lang="ts">
	import { Icon } from '@lucide/svelte';
	import type { Component } from 'svelte';

	import { getIcon } from '$lib/components/icon/icon-selector/service.js';

	interface Props {
		class?: string;
		icon?: Component;
		name?: null | string;
	}

	let { class: klass, name = null }: Props = $props();

	let foundIcon = $derived(getIcon(name));
</script>

{#if 'component' in foundIcon}
	{@const IconComponent = foundIcon.component}
	<IconComponent class={klass} />
{:else}
	<Icon class={klass} iconNode={foundIcon.iconNode} />
{/if}
