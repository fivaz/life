<script lang="ts">
	import 'flatpickr/dist/themes/airbnb.css';

	import flatpickr from 'flatpickr';

	let ref = $state<HTMLInputElement | null>(null);

	interface Props {
		label: string;
		value: string[];
	}

	let { label, value = $bindable() }: Props = $props();

	let instance = $state<flatpickr.Instance | null>(null);

	$effect(() => {
		if (ref) {
			instance = flatpickr(ref, {
				dateFormat: 'Y-m-d',
				mode: 'multiple',
				onValueUpdate: (_, datesStr) => {
					value = datesStr.split(',');
				},
			});
		}

		return () => instance?.destroy();
	});
</script>

<label class="mb-1 block text-sm text-gray-700 dark:text-white">
	{label}
	<input
		bind:this={ref}
		class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:border-white/10 dark:bg-white/5"
		{value}
	/>
</label>
