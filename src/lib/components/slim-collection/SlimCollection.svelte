<script lang="ts">
	import type { CollectionReference, Query } from 'firebase/firestore';

	import { Collection } from 'sveltefire';

	export let ref: CollectionReference | Query | string;

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

<Collection let:data {ref}>
	<slot data={parse(data)} />
</Collection>
