<script lang="ts">
	import { Collection } from 'sveltefire';

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	export let ref: any;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	export let parse: (data: any[]) => any[];
</script>

<Collection {ref} let:data>
	<slot data={parse(data)} />
</Collection>
