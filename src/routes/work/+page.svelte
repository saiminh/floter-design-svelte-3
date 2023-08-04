<script lang="ts">
  import HomeCanvas from '$lib/components/HomeCanvas.svelte';
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  export let data;

  let canvasElems: NodeListOf<Element>;
  onMount(() => {
    canvasElems = document.querySelectorAll('h1') as NodeListOf<Element>;
    // console.log('Work mounted', canvasElems);

    gsap.set(canvasElems, { autoAlpha: 0 });
    gsap.to(canvasElems, {
      duration: 1,
      opacity: 1,
      stagger: 0.1,
      ease: 'power4.out',
    });
  });
</script>

<div class="work">
  <h1>My work examples:</h1>
  
  {#each data.posts as work}
    <h2>{work.meta.title}</h2>
    <a href="{work.path}">Link to work</a>
  {/each}
</div>
{#await onMount}
  waiting
{:then}
  <HomeCanvas textsToCanvas={canvasElems}/>
{:catch error}
  <p>error</p>
{/await}


<style lang="scss">
  h1, h2 {
    line-height: 1.1;
    letter-spacing: -0.025em;
    font-weight: 400;
    opacity: 0;
    visibility: hidden;
    position: relative;
  }
  h1 {
    letter-spacing: -0.05em;
    line-height: .9;
    font-size: 2.5em;
    @media screen and (min-width: 768px) {
      font-size: 5.7em;
    }
  }
  .work {
    padding: var(--spacing-outer);
  }
</style>