<script lang="ts">
	interface Props {
		value: boolean;
		label?: string;
	}

	let { value = $bindable(), label = '' }: Props = $props();
</script>

<button onclick={() => (value = !value)} type="button" class="w-full">
	<span class="flex items-center gap-2">
		<span class="flex-1 text-start">{label}</span>
		<span
			class="{value ? 'bg-blue-600' : 'bg-gray-200'}
				relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
		>
			<span
				class="{value ? 'translate-x-6' : 'translate-x-1'}
					inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
			></span>
		</span>
	</span>
</button>
