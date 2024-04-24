<script lang="ts">
	import Modal from '$lib/components/modal/Modal.svelte';
	import { type TaskIn } from '$lib/components/task-form/service';
	import { Photo } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	let isImageOpen = false;
	export let taskIn: TaskIn;

	export let file: File | null;

	function handleChange(event: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		if (event.currentTarget.files) {
			[file] = event.currentTarget.files;
			taskIn.image = URL.createObjectURL(file);
		}
	}
</script>

<div class="flex w-full flex-col gap-2">
	{#if taskIn.image}
		<div class="flex h-24 items-center justify-center overflow-hidden">
			<button on:click={() => (isImageOpen = true)} type="button">
				<img alt="event description" src={taskIn.image} />
			</button>
			<Modal on:close={() => (isImageOpen = false)} show={isImageOpen}>
				<div class="rounded-lg bg-white p-2 shadow">
					<img
						alt="event description"
						class="max-w-11/12 h-auto max-h-[90vh] w-auto object-contain"
						src={taskIn.image}
					/>
				</div>
			</Modal>
		</div>
	{:else}
		<div class="flex h-24 items-center justify-center rounded-lg bg-indigo-50">
			<Icon class="h-10 w-10 text-indigo-700" src={Photo} />
		</div>
	{/if}
	<label
		class="inline-flex w-full justify-center gap-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
	>
		<input accept="image/*" class="hidden" name="avatar" on:change={handleChange} type="file" />
		{#if taskIn.image}Change image{:else}Add image{/if}
	</label>
</div>
