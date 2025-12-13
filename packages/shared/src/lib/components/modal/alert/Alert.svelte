<script lang="ts">
	import CircleCheck from '@lucide/svelte/icons/check-circle';
	import CircleX from '@lucide/svelte/icons/circle-x';
	import Info from '@lucide/svelte/icons/info';
	import TriangleAlert from '@lucide/svelte/icons/triangle-alert';
	import XIcon from '@lucide/svelte/icons/x';
	import type { Snippet } from 'svelte';
	import { fade } from 'svelte/transition';

	interface Props {
		isVisible: boolean;
		hasCloseButton?: boolean;
		type: 'error' | 'info' | 'success' | 'warning';
		children: Snippet;
		close?: () => void;
		class?: string;
	}

	let { isVisible, class: klass, hasCloseButton = true, type, children, close }: Props = $props();

	const typeElements = {
		error: {
			background: 'bg-red-50',
			button: 'bg-red-50 text-red-500',
			icon: CircleX,
			iconColor: 'text-red-400',
			message: 'text-red-800',
		},
		info: {
			background: 'bg-blue-50',
			button: 'bg-blue-50 text-blue-500',
			icon: Info,
			iconColor: 'text-blue-400',
			message: 'text-blue-800',
		},
		success: {
			background: 'bg-green-50',
			button: 'bg-green-50 text-green-500',
			icon: CircleCheck,
			iconColor: 'text-green-400',
			message: 'text-green-800',
		},
		warning: {
			background: 'bg-yellow-50',
			button: 'bg-yellow-50 text-yellow-500',
			icon: TriangleAlert,
			iconColor: 'text-yellow-400',
			message: 'text-yellow-800',
		},
	};
</script>

{#if isVisible}
	{@const Icon = typeElements[type].icon}
	<div class="{typeElements[type].background} {klass} rounded-md p-4" transition:fade>
		<div class="flex">
			<div class="shrink-0">
				<Icon class="{typeElements[type].button} size-5" aria-hidden="true" />
			</div>
			<div class="ml-3">
				<p class="{typeElements[type].button} text-sm font-medium">{@render children?.()}</p>
			</div>
			{#if hasCloseButton}
				<div class="ml-auto pl-3">
					<div class="-mx-1.5 -my-1.5">
						<button
							class="{typeElements[type].button}
							inline-flex rounded-md p-1.5 hover:bg-green-100 focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50 focus:outline-hidden"
							onclick={close}
							type="button"
						>
							<span class="sr-only">Dismiss</span>
							<XIcon class="size-5" aria-hidden="true" />
						</button>
					</div>
				</div>
			{/if}
		</div>
	</div>
{/if}
