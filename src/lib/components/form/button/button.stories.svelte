<script module lang="ts">
	import { Trash } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	import Button from './Button.svelte';

	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		component: Button,
	});
</script>

<Story args={{}} name="Indigo">
	<Button color="indigo" onclick={() => console.log('clicked')}>Indigo</Button>
</Story>

<Story args={{}} name="Label">
	<Button color="red" onclick={() => console.log('clicked')}>Red</Button>
</Story>

<Story args={{}} name="Loading">
	<Button color="indigo" isLoading onclick={() => console.log('clicked')}>Loading</Button>
</Story>

<Story args={{}} name="Loading with icon">
	<Button color="indigo" isLoading onclick={() => console.log('clicked')}>
		<Icon class="h-4 w-4" src={Trash} />Loading
	</Button>
</Story>
