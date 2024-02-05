<script lang="ts">
	import {
		CheckCircle,
		ExclamationTriangle,
		InformationCircle,
		XCircle,
		XMark,
	} from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import classnames from 'classnames';
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';

	export let isVisible: boolean;

	export let hasCloseButton = true;

	export let type: 'error' | 'info' | 'success' | 'warning';

	const typeElements = {
		error: {
			background: 'bg-red-50',
			button: 'bg-red-50 text-red-500',
			icon: XCircle,
			iconColor: 'text-red-400',
			message: 'text-red-800',
		},
		info: {
			background: 'bg-blue-50',
			button: 'bg-blue-50 text-blue-500',
			icon: InformationCircle,
			iconColor: 'text-blue-400',
			message: 'text-blue-800',
		},
		success: {
			background: 'bg-green-50',
			button: 'bg-green-50 text-green-500',
			icon: CheckCircle,
			iconColor: 'text-green-400',
			message: 'text-green-800',
		},
		warning: {
			background: 'bg-yellow-50',
			button: 'bg-yellow-50 text-yellow-500',
			icon: ExclamationTriangle,
			iconColor: 'text-yellow-400',
			message: 'text-yellow-800',
		},
	};

	const dispatch = createEventDispatcher();
</script>

{#if isVisible}
	<!--TODO fix this-->
	<div class={classnames(typeElements[type].background, 'rounded-md p-4')} transition:fade>
		<!--	<div class={classnames(typeElements[type].background, 'rounded-md p-4')}>-->
		<div class="flex">
			<div class="flex-shrink-0">
				<Icon
					aria-hidden="true"
					class={classnames(typeElements[type].button, 'h-5 w-5')}
					src={typeElements[type].icon}
				/>
			</div>
			<div class="ml-3">
				<p class={classnames(typeElements[type].button, 'text-sm font-medium')}><slot /></p>
			</div>
			{#if hasCloseButton}
				<div class="ml-auto pl-3">
					<div class="-mx-1.5 -my-1.5">
						<button
							class={classnames(
								typeElements[type].button,
								'inline-flex rounded-md p-1.5 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50',
							)}
							on:click={() => dispatch('close')}
							type="button"
						>
							<span class="sr-only">Dismiss</span>
							<Icon aria-hidden="true" class="h-5 w-5" src={XMark} />
						</button>
					</div>
				</div>
			{/if}
		</div>
	</div>
{/if}
