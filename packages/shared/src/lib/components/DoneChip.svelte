<script lang="ts">
	import { clsx } from 'clsx';

	interface Props {
		isDone: boolean;
	}

	let { isDone }: Props = $props();
</script>

<span class="w-16">
	<span
		class={clsx(
			isDone
				? 'bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-100'
				: 'bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-100',
			'm-auto w-max rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset',
		)}
	>
		{isDone ? 'Done' : 'Undone'}
	</span>
</span>
