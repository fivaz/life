<script context="module" lang="ts">
  import { Story, Template } from '@storybook/addon-svelte-csf';
  import type { Meta } from '@storybook/svelte';
  import HorizontalTime from './HorizontalTime.svelte';

  export const meta = {
		argTypes:{},
    component: HorizontalTime,
    parameters: {
      layout: 'fullscreen'
    }
  } satisfies Meta<HorizontalTime>;
</script>

<Template let:args>
  <HorizontalTime {...args} />
</Template>

<Story name="Primary" args={{}} />
