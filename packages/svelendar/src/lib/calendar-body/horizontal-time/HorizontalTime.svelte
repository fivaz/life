<script lang="ts">
	import { LText } from '@life/shared';
	import type { Snippet } from 'svelte';

	import {
		GRID_CELL_HEIGHT,
		SUMMARY_GRID_CELL_HEIGHT,
	} from '../calendar-week-view/calendar-day/calendar-grid/service.svelte';

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();

	const timeLabels = [
		'12AM',
		'1AM',
		'2AM',
		'3AM',
		'4AM',
		'5AM',
		'6AM',
		'7AM',
		'8AM',
		'9AM',
		'10AM',
		'11AM',
		'12PM',
		'1PM',
		'2PM',
		'3PM',
		'4PM',
		'5PM',
		'6PM',
		'7PM',
		'8PM',
		'9PM',
		'10PM',
		'11PM',
	];
</script>

<div>
	<div style="height: {SUMMARY_GRID_CELL_HEIGHT}px">
		{@render children?.()}
	</div>
	<div class="flex w-7 flex-col pr-2 text-right text-xs leading-5 md:w-14">
		{#each timeLabels as timeLabel (timeLabel)}
			<div style="height: {GRID_CELL_HEIGHT * 4}px">
				<div class="-translate-y-1/2">
					<LText class="hidden md:block" level="middle">{timeLabel}</LText>
					<LText class="block md:hidden" level="middle">{timeLabel.replace(/AM|PM/g, '')}</LText>
				</div>
			</div>
		{/each}
	</div>
</div>
