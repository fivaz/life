<script lang="ts">
	import { clsx } from 'clsx';

	// TODO implement this later
	export let maxValue: number;

	export let value: number;

	$: percentage = ((value / maxValue) * 100).toFixed(0);

	let className = '';
	export { className as class };
</script>

<div class="flex items-center gap-2 px-3">
	<div class="font-semibold">{percentage}%</div>
	<div class={clsx(className, 'h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700')}>
		<div class="h-2.5 rounded-full bg-blue-600 dark:bg-blue-500" style={`width: ${percentage}%`} />
	</div>
</div>
