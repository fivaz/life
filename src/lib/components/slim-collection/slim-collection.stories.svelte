<script lang="ts" context="module">
  import { Story, Template } from '@storybook/addon-svelte-csf';
  import type { Meta } from '@storybook/svelte';
  import SlimCollection from './SlimCollection.svelte';

  export const meta = {
    component: SlimCollection,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered'
    }
  } satisfies Meta<SlimCollection>;
</script>

<Template let:args>
  <SlimCollection {...args}></SlimCollection>
</Template>

<Story name="Primary" args={{}} />
