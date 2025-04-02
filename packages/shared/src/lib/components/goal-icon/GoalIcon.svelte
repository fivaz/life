<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';

	import type { GoalIconType } from '$lib/goal/goal.utils.js';
	import { getIcon } from '$lib/goal/goal.utils.js';

	interface Props {
		class?: string;
		icon?: GoalIconType;
		name?: null | string;
	}

	let { class: klass, icon, name = null }: Props = $props();

	let foundIcon = $derived(icon || getIcon(name));
</script>

{#if foundIcon.directComponent}
	{@const IconComponent = foundIcon.directComponent}
	<IconComponent class={klass} />
{:else}
	<Icon class={klass} src={foundIcon.component} theme={foundIcon.theme || 'solid'} />
{/if}
