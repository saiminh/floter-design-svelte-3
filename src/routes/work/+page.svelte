<script lang="ts">
  import WorkCanvas from '$lib/components/WorkCanvas.svelte';
  import { onDestroy, onMount } from 'svelte';
  import { workClickHandler, initWorkPage } from './workUtils.js';
  import { workbulge } from '$lib/utils/stores.js';
  import { CldImage } from 'svelte-cloudinary';
  import { browser } from '$app/environment';
  import { fade } from 'svelte/transition';
  export let data;

  let canvasTextElems: Array<HTMLElement>;
  let canvasImgElems: Array<HTMLElement>;
  let bulge = {factor: 0};

  workbulge.subscribe((val) => {
    bulge.factor = val;
  });
  
  onMount(() => {
    const headline: HTMLElement = document.querySelector('.headline') as HTMLElement;
    const images: Array<HTMLElement> = Array.from(document.querySelectorAll('.work img'));
    let canvasElems = initWorkPage( headline, images );  
    canvasTextElems = canvasElems.text as Array<HTMLElement>;
    canvasImgElems = canvasElems.images;
  });
</script>

<h1 class="headline"><span>Casestudies</span></h1>
  <div class="works">
    
    {#each data.posts as work, i}
      <a 
        data-sveltekit-preload-data
        href="{work.path}" 
        class="work" 
        on:click={ (e) => workClickHandler(e) } 
      >
          <CldImage 
            src={work.meta.header_bg_image}
            sizes="(min-width: 768px) 20vw, 50vw"
            alt={work.meta.title}
            width="2100"
            height="1400"
            objectFit="fill"
            loading= {i < 10 ? "eager" : "lazy"}
          />
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