<script lang="ts">
  import WorkCanvas from '$lib/components/WorkCanvas.svelte';
  import { onMount } from 'svelte';
  import { workClickHandler, initWorkPage } from './workUtils.js';
  import { workbulge } from '$lib/utils/stores.js';
  export let data;

  let canvasTextElems: Array<HTMLElement>;
  let canvasImgElems: Array<HTMLElement>;
  let bulge = {factor: 0};

  workbulge.subscribe((val) => {
    bulge.factor = val;
  });
  
  onMount(() => {
    const headline: HTMLElement = document.querySelector('.headline') as HTMLElement;
    const images: Array<HTMLElement> = Array.from(document.querySelectorAll('.workhero'));
    let canvasElems = initWorkPage( headline, images );  
    canvasTextElems = canvasElems.text as Array<HTMLElement>;
    canvasImgElems = canvasElems.images;
  });
</script>

<h1 class="headline"><span>Casestudies</span></h1>
<div class="works">
  {#each data.posts as work}
    <a href="{work.path}" class="work" on:click={ (e) => workClickHandler(e) }>
      <img class="workhero" src="{work.meta.header_bg_image}" alt="{work.meta.title}"/>
      <h2>{work.meta.title}</h2>
    </a>
  {/each}
  {#each data.posts as work}
    <a href="{work.path}" class="work" on:click={ (e) => workClickHandler(e) }>
      <img class="workhero" src="{work.meta.header_bg_image}" alt="{work.meta.title}"/>
      <h2>{work.meta.title}</h2>
    </a>
  {/each}
  {#each data.posts as work}
    <a href="{work.path}" class="work" on:click={ (e) => workClickHandler(e) }>
      <img class="workhero" src="{work.meta.header_bg_image}" alt="{work.meta.title}"/>
      <h2>{work.meta.title}</h2>
    </a>
  {/each}
  {#each data.posts as work}
    <a href="{work.path}" class="work" on:click={ (e) => workClickHandler(e) }>
      <img class="workhero" src="{work.meta.header_bg_image}" alt="{work.meta.title}"/>
      <h2>{work.meta.title}</h2>
    </a>
  {/each}
</div>
<WorkCanvas 
  textsToCanvas={canvasTextElems} 
  imgsToCanvas={canvasImgElems} 
  bulgeFactor={bulge.factor} 
/>

<style src="./work.scss" lang="scss"></style>