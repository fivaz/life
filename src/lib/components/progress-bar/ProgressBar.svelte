<script lang="ts">
	import classnames from 'classnames';

	export let maxValue: number;

	export let value: number;

	$: percentage = ((value / maxValue) * 100).toFixed(0);

	let className = '';
	export { className as class };
</script>

<div class="flex gap-2 items-center">
	<div class="font-semibold">{percentage}%</div>
	<div class={classnames(className, 'w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700')}>
		<div class="bg-blue-600 h-2.5 rounded-full dark:bg-blue-500" style={`width: ${percentage}%`} />
	</div>
</div>
