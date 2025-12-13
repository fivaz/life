<script lang="ts">
	import { LText } from '@life/shared';
	import { MoonIcon } from 'lucide-svelte';

	interface Props {
		value: boolean;
		label?: string;
		onchange?: (value: boolean) => void;
		onColorBackground?: string;
		offColorBackground?: string;
		onColor?: string;
		offColor?: string;
		onIcon?: typeof MoonIcon;
		offIcon?: typeof MoonIcon;
		class?: string;
	}

	let {
		value = $bindable(),
		label = '',
		onchange,
		onColorBackground = 'bg-indigo-500',
		offColorBackground = 'bg-gray-300',
		onColor = 'text-indigo-600',
		offColor = 'text-gray-600',
		onIcon: OnIcon,
		offIcon: OffIcon,
		class: klass,
	}: Props = $props();

	function handleClick() {
		value = !value;
		onchange?.(value);
	}
</script>

<button class={klass || 'flex items-center gap-2'} onclick={handleClick} type="button">
	{#if label}
		<LText class="flex-1 text-start">{label}</LText>
	{/if}
	<span
		class="{value ? onColorBackground : offColorBackground}
				relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
	>
		<span
			class="{value ? 'translate-x-6' : 'translate-x-1'}
					inline-block size-4 transform rounded-full bg-white transition-transform"
		>
			{#if onColor && value}
				<OnIcon class="size-4 {onColor}"></OnIcon>
			{:else if offColor}
				<OffIcon class="size-4 {offColor}"></OffIcon>
			{/if}
		</span>
	</span>
</button>
