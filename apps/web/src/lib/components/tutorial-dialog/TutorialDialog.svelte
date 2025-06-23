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

	function next() {
		if (current < steps.length - 1) {
			current += 1;
		}
	}

	function prev() {
		if (current > 0) current -= 1;
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
		<Button
			class="absolute left-4 top-1/2 -translate-y-1/2"
			onclick={prev}
			disabled={current === 0}
		>
			<CircleArrowLeftIcon class="size-6 text-white" />
		</Button>

		<Button
			class="absolute right-4 top-1/2 -translate-y-1/2"
			onclick={next}
			disabled={current === steps.length - 1}
		>
			<CircleArrowRightIcon class="size-6 text-white" />
		</Button>
		<!-- GIF -->
		{#if steps[current].gif}
			<img
				src={steps[current].gif}
				alt="Tutorial step"
				class="rounded-lg max-w-full object-contain mb-4"
			/>
		{:else}
			<div class="h-40 w-full rounded-lg flex items-end justify-center">
			</div>
		{/if}

		{#if current === steps.length - 1}
			<Button
				class="absolute top-1/2 -translate-y-1/2 text-2xl font-bold" onclick={close}>Start using the app
			</Button>
		{/if}

		<!-- Title -->
		<h2 class="text-xl font-semibold mb-2 text-indigo-600">
			{steps[current].title}
		</h2>

		<!-- Text -->
		<p class="text-gray-700 dark:text-gray-500">
			{steps[current].text}
		</p>
	</div>
</div>