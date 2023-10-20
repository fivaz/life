<script lang="ts">
	import { Trash } from '@steeze-ui/heroicons';
	import { Settings } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import type { CCategory } from '$lib/category/utils';
	import Button from '$lib/components/button/Button.svelte';

	export let category: CCategory;
</script>

<li class="flex justify-between gap-x-6 py-5">
	<div class="flex min-w-0 gap-x-4">
		<div class="min-w-0 flex-auto">
			<p class="text-sm font-semibold leading-6 text-gray-900">{category.name}</p>
		</div>
	</div>
	<div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
		<Button>
			<Icon src={Settings} class="h-4 w-4" />
		</Button>
		<Button color="red">
			<Icon src={Trash} class="h-4 w-4" />
		</Button>
	</div>
</li>
