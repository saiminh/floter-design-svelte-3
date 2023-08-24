<script lang='ts'>
  import '$lib/styles/global.scss';
  import Header from '$lib/components/Header.svelte';
	import { fade } from 'svelte/transition';
  import { navigating } from '$app/stores';
  export let data;
  
</script>

<Header />
  {#key data.pathname}
    <div 
      class="content"
    >
    {#if $navigating} 
      <div class="loader">Loading {JSON.stringify($navigating.to?.route.id)}</div>
    {/if}
      <slot />
    </div>
  {/key}

  <style lang="scss">
    .loader {
      position: fixed;
      top: calc(50% - 0.5em);
      left: 0;
      width: 100%;
      height: 1em;
      background: var(--color-bg);
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 2rem;
      z-index: 1000;
    }
  </style>