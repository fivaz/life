import {
	arrow,
	computePosition,
	type ComputePositionConfig,
	flip,
	offset,
	shift,
} from '@floating-ui/dom';

type TooltipOptions = {
	text: string;
	placement?: ComputePositionConfig['placement'];
};

function createTooltip(targetEl: HTMLElement, options: TooltipOptions | string) {
	const tooltipEl = Object.assign(document.createElement('div'), {
		role: 'tooltip',
		innerHTML: typeof options === 'string' ? options : options.text,
		style: `
        display: none;
        width: max-content;
        position: absolute;
        top: 0;
        left: 0;
        font-weight: 600;
      `,
	});

	const arrowEl = Object.assign(document.createElement('div'), {
		style: `
				position: absolute;
				width: 8px;
				height: 8px;
				transform: rotate(45deg);
			`,
	});

	tooltipEl.append(arrowEl);

	targetEl.after(tooltipEl);

	return [tooltipEl, arrowEl];
}

async function updateTooltipPosition(
	targetEl: HTMLElement,
	tooltipEl: HTMLDivElement,
	arrowEl: HTMLDivElement,
	options: TooltipOptions | string,
) {
	const { x, y, placement, middlewareData } = await computePosition(targetEl, tooltipEl, {
		...(typeof options === 'string' ? {} : { placement: options.placement }),
		middleware: [offset(6), flip(), shift({ padding: 5 }), arrow({ element: arrowEl })],
	});

	Object.assign(tooltipEl.style, {
		left: `${x}px`,
		top: `${y}px`,
	});

	const { x: arrowX, y: arrowY } = middlewareData.arrow as { x: number; y: number };

	const staticSide = {
		top: 'bottom',
		right: 'left',
		bottom: 'top',
		left: 'right',
	}[placement.split('-')[0]] as string;

	//style arrow
	Object.assign(arrowEl.style, {
		left: arrowX != null ? `${arrowX}px` : '',
		top: arrowY != null ? `${arrowY}px` : '',
		right: '',
		bottom: '',
		[staticSide]: '-4px',
	});
}

export function tooltip(targetEl: HTMLElement, options: TooltipOptions | string) {
	const [tooltipEl, arrowEl] = createTooltip(targetEl, options);

	function showTooltip() {
		tooltipEl.style.display = 'block';
		void updateTooltipPosition(targetEl, tooltipEl, arrowEl, options);
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
