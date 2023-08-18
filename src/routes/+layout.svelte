<script lang='ts'>
  import '$lib/styles/global.scss';
  import Logo from '$lib/components/Logo.svelte';
  import MainNav from '$lib/components/MainNav.svelte';
	import { fade } from 'svelte/transition';
  export let data;
</script>

<a href='/' class="logo"><Logo /></a>
<MainNav />

{#key data.pathname}
  <div 
    class="content" 
    in:fade={{ duration: 100, delay: 0  }} 
    out:fade={{ duration: 100, delay: 100 }}
  >
    <slot />
  </div>
{/key}

<style lang="scss">
  .logo {
    height: 36px;
    width: auto;
    position: fixed;
    bottom: 0;
    z-index: 4;
    display: block;
    margin: var(--spacing-nav);
    cursor: url('/pointer.svg'), auto;
  }
</style>