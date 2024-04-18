<script lang="ts" context="module">
  import { Story, Template } from '@storybook/addon-svelte-csf';
  import type { Meta } from '@storybook/svelte';
  import  from './.svelte';

  export const meta = {
    component: ,
		argTypes:{},
    parameters: {
      layout: 'fullscreen'
    }
  } satisfies Meta<>;
</script>

<Template let:args>
  < {...args} />
</Template>

<Story name="Primary" args={{}} />
