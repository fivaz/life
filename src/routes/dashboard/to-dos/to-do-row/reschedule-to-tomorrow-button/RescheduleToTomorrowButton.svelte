<script lang="ts">
	import { ArrowUturnUp } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import Button from '$lib/components/button/Button.svelte';
	import type { AnyTask } from '$lib/task/utils';

	export let task: AnyTask;
</script>

<Button type="submit">
	<Icon src={ArrowUturnUp} class="h-4 w-4" />
</Button>
