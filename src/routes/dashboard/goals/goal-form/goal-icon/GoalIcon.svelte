<script lang="ts">
	
import { Icon } from '@steeze-ui/svelte-icon';
	import { clsx } from 'clsx';

	import type { GoalIconType } from './service';

	let className = '';
	export { className as class };

	export let icon: GoalIconType;
</script>

<Icon class={clsx(className)} src={icon.component} theme={icon.theme || 'solid'} />
