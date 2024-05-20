<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';
	import { clsx } from 'clsx';

	import type { GoalIconType } from './service';

	import { getIcon } from './service';

	let className = '';
	export { className as class };

	export let icon: GoalIconType | undefined = undefined;

	export let name: null | string = null;

	$: foundIcon = icon || getIcon(name);
</script>

<Icon class={clsx(className)} src={foundIcon.component} theme={foundIcon.theme || 'solid'} />
