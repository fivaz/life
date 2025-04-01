<script lang="ts">
	import { Button } from '@life/shared';
	import { Editor } from '@tiptap/core';
	// eslint-disable-next-line import/no-named-as-default
	import TaskItem from '@tiptap/extension-task-item';
	// eslint-disable-next-line import/no-named-as-default
	import TaskList from '@tiptap/extension-task-list';
	// eslint-disable-next-line import/no-named-as-default
	import StarterKit from '@tiptap/starter-kit';
	import { BoldIcon, ItalicIcon, ListTodoIcon } from 'lucide-svelte';
	import { onDestroy, onMount } from 'svelte';

	let { content = $bindable('<p>Start writing...</p>') } = $props();

	let editor = $state<Editor | null>(null);
	let editorEl = $state<HTMLElement | null>(null);

	onMount(() => {
		// Initialize editor when element is available

		if (editorEl) {
			editor = new Editor({
				element: editorEl,
				extensions: [StarterKit, TaskList, TaskItem.configure({ nested: true })],
				content,
				onUpdate: ({ editor }) => {
					content = editor.getHTML();
				},
				onTransaction: () => {
					// force re-render so `editor.isActive` works as expected
					editor = editor;
				},
			});
		}
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});

	function toggleTaskList() {
		editor?.chain().focus().toggleTaskList().run();
	}
</script>

<div class="rounded">
	<div class="flex gap-2 pb-1">
		{#if editor}
			<Button
				color="white"
				onclick={() => editor?.chain().focus().toggleBold().run()}
				padding="p-1"
				type="button"
			>
				<BoldIcon class="size-4" />
			</Button>

			<Button
				color="white"
				onclick={() => editor?.chain().focus().toggleItalic().run()}
				padding="p-1"
				type="button"
			>
				<ItalicIcon class="size-4" />
			</Button>
			<Button color="white" onclick={toggleTaskList} padding="p-1" type="button">
				<ListTodoIcon class="size-4" />
			</Button>
		{/if}
	</div>

	<article
		bind:this={editorEl}
		class="w-full max-w-full rounded-md border border-gray-300 bg-white px-2 py-1 text-gray-700 shadow-sm sm:text-sm dark:border-white/10 dark:bg-white/5 dark:text-white"
	></article>
</div>
