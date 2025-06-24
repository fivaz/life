<script lang="ts">
	import { onMount } from 'svelte';
	import { Button } from '@life/shared';
	import { CircleArrowLeftIcon, CircleArrowRightIcon } from 'lucide-svelte';

	type TutorialStep = {
		gif?: string;
		title: string;
		text: string;
	};

	const { steps, close }: { steps: TutorialStep[], close: () => void } = $props();

	let current = $state(0);
	let phase: 'intro' | 'tutorial' | 'outro' = $state('intro');

	function next() {
		if (phase === 'intro') {
			phase = 'tutorial';
			current = 0;
		} else if (phase === 'tutorial' && current < steps.length - 1) {
			current += 1;
		} else if (phase === 'tutorial' && current === steps.length - 1) {
			phase = 'outro';
		}
	}

	function prev() {
		if (phase === 'tutorial' && current > 0) {
			current -= 1;
		} else if (phase === 'tutorial' && current === 0) {
			phase = 'intro';
		}
	}

	function handleKey(event: KeyboardEvent) {
		if (event.key === 'ArrowRight') next();
		if (event.key === 'ArrowLeft') prev();
	}

	onMount(() => {
		window.addEventListener('keydown', handleKey);
		return () => window.removeEventListener('keydown', handleKey);
	});
</script>

<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
	<div
		class="relative bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-2xl shadow-lg w-[90%] max-w-xl p-6 flex flex-col items-center text-center">

		<!-- Arrows -->
		{#if phase === 'tutorial'}
			<Button
				class="absolute left-4 top-1/2 -translate-y-1/2"
				onclick={prev}
			>
				<CircleArrowLeftIcon class="size-6 text-white" />
			</Button>

			<Button
				class="absolute right-4 top-1/2 -translate-y-1/2"
				onclick={next}
			>
				<CircleArrowRightIcon class="size-6 text-white" />
			</Button>
		{/if}

		<!-- INTRO -->
		{#if phase === 'intro'}
			<h2 class="text-2xl font-bold mb-4 text-indigo-600">Welcome to Life</h2>
			<p class="text-gray-700 dark:text-gray-300 mb-6">
				Your new favorite app to manage events, goals, and tasks — all in one place.
				We'll walk you through the main features so you can get the most out of it.
			</p>
			<Button class="text-lg font-semibold" onclick={next}>Start Tour</Button>

			<!-- TUTORIAL -->
		{:else if phase === 'tutorial'}
			{#if steps[current].gif}
				<img
					class="rounded-lg max-w-full object-contain mb-4"
					src={steps[current].gif}
					alt="Tutorial step"
				/>
			{:else}
				<div class="h-40 w-full rounded-lg flex items-end justify-center mb-4"></div>
			{/if}

			<h2 class="text-xl font-semibold mb-2 text-indigo-600">
				{steps[current].title}
			</h2>
			<p class="text-gray-700 dark:text-gray-500">
				{steps[current].text}
			</p>

			<!-- OUTRO -->
		{:else if phase === 'outro'}
			<h2 class="text-2xl font-bold mb-4 text-indigo-600">And So Much More</h2>
			<p class="text-gray-700 dark:text-gray-300 mb-6">
				Discover even more features designed to keep you productive, organized, and in control of your time.
			</p>
			<Button class="text-lg font-semibold" onclick={close}>Start using the app</Button>
		{/if}
	</div>
</div>