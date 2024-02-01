<script lang="ts">
	import { Collection } from 'sveltefire';

	export let ref: string;

	export let parse: (data: any[]) => any[];
</script>

<Collection {ref} let:data>
	<slot data={parse(data)} />
</Collection>
