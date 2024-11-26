<script lang='ts'>
	import type { GoalIconType } from '@life/lib/goal';
	import { getIcon } from '@life/lib/goal';
	import { Icon } from '@steeze-ui/svelte-icon';


	interface Props {
		class?: string;
		icon?: GoalIconType;
		name?: null | string;
	}

	let { class: klass, icon, name = null }: Props = $props();

	let foundIcon = $derived(icon || getIcon(name));
</script>

<Icon class={klass} src={foundIcon.component} theme={foundIcon.theme || 'solid'} />
