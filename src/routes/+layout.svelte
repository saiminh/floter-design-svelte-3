<script lang='ts'>
  import '$lib/styles/global.scss';
  import Header from '$lib/components/Header.svelte';
  import Loader from '$lib/components/Loader.svelte';
  import { navigating } from '$app/stores';
  export let data;
  
</script>

<Header />
  {#key data.pathname}
    <div 
      class="content"
    >
    {#if $navigating} 
      <Loader />
    {/if}
      <slot />
    </div>
  {/key}