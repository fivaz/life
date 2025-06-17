<script lang="ts">
	import { onMount } from 'svelte';
	import { Modal } from '@life/shared';
	import { CircleArrowLeft, CircleArrowLeftIcon, CircleArrowRight, CircleArrowRightIcon, XIcon } from 'lucide-svelte';
	import { Button } from '@life/shared';

	type TutorialStep = {
		gif: string;
		title: string;
		text: string;
	};

	const {steps, close} : {steps: TutorialStep[], close: () => void} = $props();

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
		if (event.key === 'Escape') close();
	}

	onMount(() => {
		window.addEventListener('keydown', handleKey);
		return () => window.removeEventListener('keydown', handleKey);
	});
</script>

<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
	<div class="relative bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-2xl shadow-lg w-[90%] max-w-xl p-6 flex flex-col items-center text-center">
		<div class='absolute top-0 right-0 p-2'>
			<button onclick={() => close()} class='p-2'>
				<XIcon class="size-5 text-gray-500" />
			</button>
		</div>

		<!-- Arrows -->
			<Button
				class="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold"
				onclick={prev}
				disabled={current === 0}
			>
				<CircleArrowLeftIcon class="size-6 text-white"/>
			</Button>

			<Button
				class="absolute right-4 top-1/2 -translate-y-1/2 text-2xl font-bold"
				onclick={next}
				disabled={current === steps.length - 1}
			>
				<CircleArrowRightIcon class="size-6 text-white"/>
			</Button>
		<!-- GIF -->
		<img
			src={steps[current].gif}
			alt="Tutorial step"
			class="rounded-lg max-w-full object-contain mb-4"
		/>

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