<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  export let data;

  let visible = false;

  onMount(() => {
    let workheros = document.querySelector('.hero');
    console.log(workheros);
    visible = true;
  })
</script>
<article>
  <img class="hero" src="{data.header_bg_image}" alt="{data.title}" />
  {#if visible}
  <h1 in:fly>{data.title}</h1>
  <p in:fly>{@html data.Content.html}</p>
  {/if}
</article>

<style lang="scss">
  article {
    padding: var(--spacing-outer);
  }
  .hero {
    position: fixed;
    top: 0;
    left:0;
    width: 100%;
    z-index: 0;
    height: auto;
    // object-fit: cover;
  }
  h1, p {
    position: relative;
    z-index: 1;
  }
  @media (max-width: 767px){
    h1 {
      margin-top: calc(100vw / 1.333);
    }
  }
</style>