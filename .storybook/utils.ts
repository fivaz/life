import type { Component, ComponentProps, SvelteComponent } from 'svelte';

export type IncreaseArgs<
	ComponentType extends // eslint-disable-next-line
		SvelteComponent | Component<any, any>,
	AdditionalArgs,
> = Component<AdditionalArgs & ComponentProps<ComponentType>>;
