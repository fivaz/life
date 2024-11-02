import { computePosition, type ComputePositionConfig, offset } from '@floating-ui/dom';

type TooltipOptions = {
	text: string;
	placement?: ComputePositionConfig['placement'];
};

export function tooltip(targetEl: HTMLElement, options?: TooltipOptions) {
	const tooltipEl = createTooltip(targetEl);

	function createTooltip(targetEl: HTMLElement) {
		const tooltipEl = Object.assign(document.createElement('div'), {
			role: 'tooltip',
			innerHTML: options?.text ?? 'Tooltip',
			style: `
        display: none;
        width: max-content;
        position: absolute;
        top: 0;
        left: 0;
        font-weight: 600;
      `,
		});

		targetEl.after(tooltipEl);

		return tooltipEl;
	}

	async function updateTooltipPosition(targetEl: HTMLElement, tooltipEl: HTMLElement) {
		const { x, y } = await computePosition(targetEl, tooltipEl, {
			placement: options?.placement,
			middleware: [offset(8)],
		});

		Object.assign(tooltipEl.style, {
			left: `${x}px`,
			top: `${y}px`,
		});
	}

	function showTooltip() {
		tooltipEl.style.display = 'block';
		void updateTooltipPosition(targetEl, tooltipEl);
	}

	function hideTooltip() {
		tooltipEl.style.display = 'none';
	}

	targetEl.addEventListener('mouseenter', showTooltip);
	targetEl.addEventListener('mouseleave', hideTooltip);

	return {
		destroy() {
			// remove event listeners when element is removed
			targetEl.removeEventListener('mouseenter', showTooltip);
			targetEl.removeEventListener('mouseLeave', hideTooltip);
		},
	};
}
