<script lang='ts'>
  import '$lib/styles/global.scss';
  import Header from '$lib/components/Header.svelte';
  import Loader from '$lib/components/Loader.svelte';
  import { navigating, page } from '$app/stores';
  export let data;
</script>

<svelte:head>
  <meta property="og:type" content="website" />
  <meta property="og:url" content={`https://floter.design`+data.pathname} />
  <meta property="og:image" content="https://floter.design/ogimage.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="description" content={$page.data.description ? $page.data.description : 'Simon Flöter is a designer and creative developer'} />
  <title>{$page.data.title ? $page.data.title : 'Simon Flöter, Designer and Creative Developer'}</title>
</svelte:head>

<Header />
{#key data.pathname}
  <div class="content">
    {#if $navigating} 
      <Loader />
    {/if}
    <slot />
  </div>
{/key}