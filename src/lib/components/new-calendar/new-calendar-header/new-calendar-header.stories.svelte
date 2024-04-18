<script lang="ts" context="module">
  import { Story, Template } from '@storybook/addon-svelte-csf';
  import type { Meta } from '@storybook/svelte';
  import NewCalendarHeader from './NewCalendarHeader.svelte';

  export const meta = {
    component: NewCalendarHeader,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered'
    }
  } satisfies Meta<NewCalendarHeader>;
</script>

<Template let:args>
  <NewCalendarHeader {...args}></NewCalendarHeader>
</Template>

<Story name="Primary" args={{}} />
