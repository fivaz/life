<script lang="ts" context="module">
  import { Story, Template } from '@storybook/addon-svelte-csf';
  import type { Meta } from '@storybook/svelte';
  import EventsList from './EventsList.svelte';

  export const meta = {
    component: EventsList,
		argTypes:{},
    parameters: {
      layout: 'fullscreen'
    }
  } satisfies Meta<EventsList>;
</script>

<Template let:args>
  <EventsList {...args} />
</Template>

<Story name="Primary" args={{}} />
