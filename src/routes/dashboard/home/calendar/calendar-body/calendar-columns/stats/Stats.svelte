<script lang="ts">
	import type { TTask } from '$lib/task/utils';
	import classnames from 'classnames';
	import { calculateGroupPercentages } from './service';

	let className = '';
	export { className as class };
	export let events: TTask[];

	$: groups = calculateGroupPercentages(events);
</script>

<div class={classnames('flex text-xs gap-1', className)}>
	<div class="text-blue-600">{groups.sleep || 0}%</div>
	<div class="text-green-600">{groups.work || 0}%</div>
	<div class="text-red-600">{groups.fun || 0}%</div>
</div>
