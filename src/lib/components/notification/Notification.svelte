<script lang="ts">
	import { CheckCircle, XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	export let show: boolean;
</script>

<div
	aria-live="assertive"
	class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
>
	<div class="flex w-full flex-col items-center space-y-4 sm:items-end">
		{#if show}
			<div
				class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
			>
				<div class="p-4">
					<div class="flex items-start">
						<div class="flex-shrink-0">
							<Icon aria-hidden="true" class="h-6 w-6 text-green-400" src={CheckCircle} />
						</div>
						<div class="ml-3 w-0 flex-1 pt-0.5">
							<p class="text-sm font-medium text-gray-900">Successfully saved!</p>
							<p class="mt-1 text-sm text-gray-500">Anyone with a link can now view this file.</p>
						</div>
						<div class="ml-4 flex flex-shrink-0">
							<button
								class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
								on:click={() => (show = false)}
								type="button"
							>
								<span class="sr-only">Close</span>
								<Icon aria-hidden="true" class="h-5 w-5" src={XMark} />
							</button>
						</div>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>
