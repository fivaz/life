<script lang="ts">
	interface Props {
		class?: string;
	}

	let { class: klass }: Props = $props();
</script>

<svg class={klass} height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
	<g>
		<path d="M7 3H17V7.2L12 12L7 7.2V3Z" fill="currentColor">
			<animate
				id="eosIconsHourglass0"
				attributeName="opacity"
				begin="0;eosIconsHourglass1.end"
				dur="2s"
				fill="freeze"
				from="1"
				to="0"
			/>
		</path>
		<path d="M17 21H7V16.8L12 12L17 16.8V21Z" fill="currentColor">
			<animate
				attributeName="opacity"
				begin="0;eosIconsHourglass1.end"
				dur="2s"
				fill="freeze"
				from="0"
				to="1"
			/>
		</path>
		<path
			d="M6 2V8H6.01L6 8.01L10 12L6 16L6.01 16.01H6V22H18V16.01H17.99L18 16L14 12L18 8.01L17.99 8H18V2H6ZM16 16.5V20H8V16.5L12 12.5L16 16.5ZM12 11.5L8 7.5V4H16V7.5L12 11.5Z"
			fill="currentColor"
		/>
		<animateTransform
			id="eosIconsHourglass1"
			attributeName="transform"
			attributeType="XML"
			begin="eosIconsHourglass0.end"
			dur="0.5s"
			from="0 12 12"
			to="180 12 12"
			type="rotate"
		/>
	</g>
</svg>
