<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';

	import type { GoalIconType } from './service';

	import { getIcon } from './service';

	interface Props {
		class?: string;
		icon?: GoalIconType;
		name?: null | string;
	}

	let { class: klass, icon, name = null }: Props = $props();

	let foundIcon = $derived(icon || getIcon(name));
</script>

<Icon class={klass} src={foundIcon.component} theme={foundIcon.theme || 'solid'} />
