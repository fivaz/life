<script lang="ts">
	import { ExclamationTriangle, XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import Modal from '$lib/components/modal/Modal.svelte';
	import { createEventDispatcher } from 'svelte';

	export let show: boolean;
	export let title: string;
	export let message: string = '';
	export let confirmText: string;
	export let cancelText: string;

	const dispatch = createEventDispatcher<{ close: null; confirm: null; cancel: null }>();
</script>

<Modal {show} on:close={() => dispatch('close')}>
	<div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
		<div
			class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
		>
			<div class="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
				<button
					type="button"
					class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
					on:click={() => dispatch('close')}
				>
					<span class="sr-only">Close</span>
					<Icon src={XMark} class="h-6 w-6" aria-hidden="true" />
				</button>
			</div>
			<div class="sm:flex sm:items-start">
				<div
					class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
				>
					<Icon src={ExclamationTriangle} class="h-6 w-6 text-red-600" aria-hidden="true" />
				</div>
				<div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
					<h3 class="text-base font-semibold leading-6 text-gray-900">{title}</h3>
					<div class="mt-2">
						<p class="text-sm text-gray-500">
							{message}
						</p>
					</div>
				</div>
			</div>
			<div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
				<button
					type="button"
					class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
					on:click={() => dispatch('confirm')}
				>
					{confirmText}
				</button>
				<button
					type="button"
					class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
					on:click={() => dispatch('cancel')}
				>
					{cancelText}
				</button>
			</div>
		</div>
	</div>
</Modal>
