<script lang="ts">
	import { Modal } from '@life/shared';
	import Image from '@lucide/svelte/icons/image';
	import heic2any from 'heic2any';

	import { taskIn } from '$lib/task/task-form/service.svelte';

	let isImageOpen = $state(false);

	async function handleChange(event: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		if (event.currentTarget.files) {
			const file = event.currentTarget.files[0];

			if (file.type === 'image/heic' || file.name.endsWith('.heic')) {
				try {
					const convertedBlob = await heic2any({
						blob: file,
						toType: 'image/jpeg',
						quality: 0.8,
					});
					const convertedFile = new File(
						[convertedBlob as Blob],
						file.name.replace(/\.heic$/, '.jpg'),
						{
							type: 'image/jpeg',
						},
					);
					taskIn.value.file = convertedFile;
					taskIn.value.image = URL.createObjectURL(convertedFile);
				} catch (e) {
					console.error('HEIC conversion failed:', e);
				}
			} else {
				taskIn.value.file = file;
				taskIn.value.image = URL.createObjectURL(file);
			}
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
				<div class="z-20 rounded-lg p-2 shadow-sm">
					<img
						class="h-auto max-h-[90vh] w-auto max-w-11/12 object-contain"
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
		class="inline-flex w-full justify-center gap-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 focus-visible:outline-solid"
	>
		<input name="avatar" class="hidden" accept="image/*" onchange={handleChange} type="file" />
		{#if taskIn.value.image}
			Change image
		{:else}
			Add image
		{/if}
	</label>
</div>
