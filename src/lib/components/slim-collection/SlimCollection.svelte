<script lang="ts">
	import type { CollectionReference, Query } from 'firebase/firestore';
	import { Collection } from 'sveltefire';

	export let ref: string | CollectionReference | Query;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	function defaultParse(rawData: any[]): any[] {
		return rawData.map((rawDatum) => {
			const { ref, ...datum } = rawDatum;
			return datum;
		});
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	export let parse: (data: any[]) => any[] = defaultParse;
</script>

<Collection {ref} let:data>
	<slot data={parse(data)} />
</Collection>
