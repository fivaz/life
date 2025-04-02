<script lang="ts">
	import { Modal } from '@life/shared';
	import Image from '@lucide/svelte/icons/image';

	import { taskIn } from '$lib/task/task-form/service.svelte';

	let isImageOpen = $state(false);

	function handleChange(event: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		if (event.currentTarget.files) {
			[taskIn.value.file] = event.currentTarget.files;
			taskIn.value.image = URL.createObjectURL(taskIn.value.file);
		}
	}
</script>

<div class="flex w-full flex-col gap-2">
	{#if taskIn.value.image}
		<div class="flex h-24 items-center justify-center overflow-hidden">
			<button onclick={() => (isImageOpen = true)} type="button">
				<img alt="event description" src={taskIn.value.image} />
			</button>
			<Modal close={() => (isImageOpen = false)} isOpen={isImageOpen}>
				<!--normally I wouldn't need to restate the z-index of the Modal to its children, but due to an unknown bug I have to-->
				<div class="z-20 rounded-lg p-2 shadow">
					<img
						class="max-w-11/12 h-auto max-h-[90vh] w-auto object-contain"
						alt="event description"
						src={taskIn.value.image}
					/>
				</div>
			</Modal>
		</div>
	{:else}
		<div class="flex h-24 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-50/5">
			<Image class="size-10 text-indigo-700" />
		</div>
	{/if}
	<label
		class="inline-flex w-full justify-center gap-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
	>
		<input name="avatar" class="hidden" accept="image/*" onchange={handleChange} type="file" />
		{#if taskIn.value.image}
			Change image
		{:else}
			Add image
		{/if}
	</label>
</div>
