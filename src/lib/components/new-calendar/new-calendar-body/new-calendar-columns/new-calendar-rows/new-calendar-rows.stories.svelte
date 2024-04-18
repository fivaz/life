<script context="module" lang="ts">
  import { Story, Template } from '@storybook/addon-svelte-csf';
  import type { Meta } from '@storybook/svelte';
  import NewCalendarRows from './NewCalendarRows.svelte';

  export const meta = {
		argTypes:{},
    component: NewCalendarRows,
    parameters: {
      layout: 'fullscreen'
    }
  } satisfies Meta<NewCalendarRows>;
</script>

<Template let:args>
  <NewCalendarRows {...args} />
</Template>

<Story name="Primary" args={{}} />
