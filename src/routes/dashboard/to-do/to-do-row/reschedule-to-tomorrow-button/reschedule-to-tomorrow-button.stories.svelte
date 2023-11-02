<script lang="ts" context="module">
  import { Story, Template } from '@storybook/addon-svelte-csf';
  import type { Meta } from '@storybook/svelte';
  import RescheduleToTomorrowButton from './RescheduleToTomorrowButton.svelte';

  export const meta = {
    component: RescheduleToTomorrowButton,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered'
    }
  } satisfies Meta<RescheduleToTomorrowButton>;
</script>

<Template let:args>
  <RescheduleToTomorrowButton {...args}></RescheduleToTomorrowButton>
</Template>

<Story name="Primary" args={{}} />
