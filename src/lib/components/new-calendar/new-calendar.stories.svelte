<script lang="ts" context="module">
  import { Story, Template } from '@storybook/addon-svelte-csf';
  import type { Meta } from '@storybook/svelte';
  import NewCalendar from './NewCalendar.svelte';

  export const meta = {
    component: NewCalendar,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered'
    }
  } satisfies Meta<NewCalendar>;
</script>

<Template let:args>
  <NewCalendar {...args}></NewCalendar>
</Template>

<Story name="Primary" args={{}} />
