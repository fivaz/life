<script lang="ts">
	import { LText } from '@life/shared';

	interface Props {
		maxValue: number;
		value: number;
		class?: string;
	}

	let { maxValue, value, class: klass = '' }: Props = $props();

	let percentage = $derived(((value / maxValue) * 100).toFixed(0));
</script>

<div class="flex items-center gap-2">
	<LText class="font-semibold">{percentage}%</LText>
	<div class="{klass} h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
		<div
			style={`width: ${percentage}%`}
			class="h-2.5 rounded-full bg-indigo-600 dark:bg-indigo-500"
		></div>
	</div>
</div>
