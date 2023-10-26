<script lang="ts">
	import {
		TransitionChild,
		TransitionRoot,
		Dialog,
		DialogOverlay,
	} from '@rgossiaux/svelte-headlessui';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let show: boolean;
</script>

<TransitionRoot {show}>
	<Dialog class="fixed z-20 inset-0 overflow-y-auto" on:close={() => dispatch('close')}>
		<div
			class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
		>
			<TransitionChild
				enter="ease-out duration-300"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="ease-in duration-200"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				<DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
			</TransitionChild>

			<TransitionChild
				enter="ease-out duration-300"
				enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
				enterTo="opacity-100 translate-y-0 sm:scale-100"
				leave="ease-in duration-200"
				leaveFrom="opacity-100 translate-y-0 sm:scale-100"
				leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
				class="h-screen flex justify-center items-end sm:items-center pb-14"
			>
				<div
					class="inline-block align-bottom bg-white rounded-lg text-left shadow-xl transform transition-all sm:align-middle"
				>
					<slot />
				</div>
			</TransitionChild>
		</div>
	</Dialog>
</TransitionRoot>
