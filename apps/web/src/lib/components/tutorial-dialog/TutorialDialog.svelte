<script lang="ts">
	import { Button } from '@life/shared';
	import { CircleArrowLeftIcon, CircleArrowRightIcon } from 'lucide-svelte';
	import { onMount } from 'svelte';

	type TutorialStep = {
		gif?: string;
		title: string;
		text: string;
	};

	const { steps, close }: { steps: TutorialStep[]; close: () => void } = $props();

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

<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
	<div
		class="relative flex w-[90%] max-w-xl flex-col items-center rounded-2xl border bg-white p-6 text-center shadow-lg dark:border-gray-800 dark:bg-gray-900"
	>
		<!-- Arrows -->
		{#if phase === 'tutorial'}
			<Button class="absolute left-4 top-1/2 -translate-y-1/2" onclick={prev}>
				<CircleArrowLeftIcon class="size-6 text-white" />
			</Button>

			<Button class="absolute right-4 top-1/2 -translate-y-1/2" onclick={next}>
				<CircleArrowRightIcon class="size-6 text-white" />
			</Button>
		{/if}

		<!-- INTRO -->
		{#if phase === 'intro'}
			<h2 class="mb-4 text-2xl font-bold text-indigo-600">Welcome to Life</h2>
			<p class="mb-6 text-gray-700 dark:text-gray-300">
				Your new favorite app to manage events, goals, and tasks — all in one place. We'll walk you
				through the main features so you can get the most out of it.
			</p>
			<Button class="text-lg font-semibold" onclick={next}>Start Tour</Button>

			<!-- TUTORIAL -->
		{:else if phase === 'tutorial'}
			{#if steps[current].gif}
				<img
					class="mb-4 max-w-full rounded-lg object-contain"
					alt="Tutorial step"
					src={steps[current].gif}
				/>
			{:else}
				<div class="mb-4 flex h-40 w-full items-end justify-center rounded-lg"></div>
			{/if}

			<h2 class="mb-2 text-xl font-semibold text-indigo-600">
				{steps[current].title}
			</h2>
			<p class="text-gray-700 dark:text-gray-500">
				{steps[current].text}
			</p>

			<!-- OUTRO -->
		{:else if phase === 'outro'}
			<h2 class="mb-4 text-2xl font-bold text-indigo-600">And So Much More</h2>
			<p class="mb-6 text-gray-700 dark:text-gray-300">
				Discover even more features designed to keep you productive, organized, and in control of
				your time.
			</p>
			<Button class="text-lg font-semibold" onclick={close}>Start using the app</Button>
		{/if}
	</div>
</div>
