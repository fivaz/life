<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import { computePosition, flip, shift, offset, type Placement, arrow } from '@floating-ui/dom';

	interface Props {
		children: Snippet;
		text: string;
		placement?: Placement;
		class?: string;
	}

	let { class: klass, children, text, placement }: Props = $props();

	let button = $state<HTMLButtonElement | null>(null);
	let tooltip = $state<HTMLDivElement | null>(null);
	let arrowElement = $state<HTMLDivElement | null>(null);

	function showTooltip() {
		if (!tooltip) return;
		tooltip.style.display = 'block';
		update();
	}

	function hideTooltip() {
		if (!tooltip) return;
		tooltip.style.display = '';
	}

	async function update() {
		if (!button || !tooltip || !arrowElement) return;

		const {
			x,
			y,
			placement: arrowPlacement,
			middlewareData,
		} = await computePosition(button, tooltip, {
			placement,
			middleware: [offset(6), flip(), shift({ padding: 5 }), arrow({ element: arrowElement })],
		});

		//style tooltip
		Object.assign(tooltip.style, {
			left: `${x}px`,
			top: `${y}px`,
		});

		const { x: arrowX, y: arrowY } = middlewareData.arrow as { x: number; y: number };

		const staticSide = {
			top: 'bottom',
			right: 'left',
			bottom: 'top',
			left: 'right',
		}[arrowPlacement.split('-')[0]] as string;

		//style arrow
		Object.assign(arrowElement.style, {
			left: arrowX != null ? `${arrowX}px` : '',
			top: arrowY != null ? `${arrowY}px` : '',
			right: '',
			bottom: '',
			[staticSide]: '-4px',
		});
	}

	onMount(() => {
		const events: [string, () => void][] = [
			['mouseenter', showTooltip],
			['mouseleave', hideTooltip],
			['focus', showTooltip],
			['blur', hideTooltip],
		];

		events.forEach(([event, listener]) => {
			if (!button) return;
			button.addEventListener(event, listener);
		});
	});
</script>

<div
	bind:this={tooltip}
	id="tooltip"
	role="tooltip"
	class="{klass} absolute left-0 top-0 hidden w-max rounded p-1.5 text-[90%]"
>
	{text}
	<div class="absolute h-2 w-2 rotate-45 transform" bind:this={arrowElement} id="arrow"></div>
</div>

<button bind:this={button} id="button" aria-describedby="tooltip" type="button">
	{@render children()}
</button>
