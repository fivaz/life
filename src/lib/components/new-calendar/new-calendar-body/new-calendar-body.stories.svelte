<script lang="ts" context="module">
  import { Story, Template } from '@storybook/addon-svelte-csf';
  import type { Meta } from '@storybook/svelte';
  import NewCalendarBody from './NewCalendarBody.svelte';

  export const meta = {
    component: NewCalendarBody,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered'
    }
  } satisfies Meta<NewCalendarBody>;
</script>

<Template let:args>
  <NewCalendarBody {...args}></NewCalendarBody>
</Template>

<Story name="Primary" args={{}} />
