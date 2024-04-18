<script context="module" lang="ts">
  import { Story, Template } from '@storybook/addon-svelte-csf';
  import type { Meta } from '@storybook/svelte';
  import NewWeekCalendarBody from './NewWeekCalendarBody.svelte';

  export const meta = {
		argTypes:{},
    component: NewWeekCalendarBody,
    parameters: {
      layout: 'fullscreen'
    }
  } satisfies Meta<NewWeekCalendarBody>;
</script>

<Template let:args>
  <NewWeekCalendarBody {...args} />
</Template>

<Story name="Primary" args={{}} />
