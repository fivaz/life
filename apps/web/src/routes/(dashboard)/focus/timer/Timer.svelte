<script lang="ts">
	interface Props {
		value: number;
	}

	let { value }: Props = $props();

	let minutes = $derived<number>(Math.floor(value / 60));
	let seconds = $derived<number>(value % 60);
</script>

<div class="text-6xl font-bold text-indigo-600">
	{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
</div>
