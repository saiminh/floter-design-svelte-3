<script lang="ts">
  import WorkCanvas from '$lib/components/WorkCanvas.svelte';
  import { onMount } from 'svelte';
  import { workClickHandler, initWorkPage } from './workUtils.js';
  import { workbulge } from '$lib/utils/stores.js';
  import { CldImage } from 'svelte-cloudinary';
  export let data;

  const orderedPosts = data.posts.sort((a, b) => {
    return a.meta.order - b.meta.order;
  });

  let canvasTextElems: Array<HTMLElement>;
  let canvasImgElems: Array<HTMLElement>;
  let bulge = {factor: 0};

  workbulge.subscribe((val) => {
    bulge.factor = val;
  });
  
  onMount(() => {
    const headline: HTMLElement = document.querySelector('.headline') as HTMLElement;
    const headlines: Array<HTMLElement> = Array.from(document.querySelectorAll('h2, li'));
    const images: Array<HTMLElement> = Array.from(document.querySelectorAll('.work img'));
    let canvasElems = initWorkPage( headlines, images );  
    canvasTextElems = canvasElems.text as Array<HTMLElement>;
    canvasImgElems = canvasElems.images;
  });
</script>
<div class="works-wrapper">

  <h1 class="headline"><span>Outstanding work</span></h1>
    <div class="works">
      
      {#each orderedPosts as work, i}
        <a 
          data-sveltekit-preload-data
          href="{work.path}" 
          class="work" 
          on:click={ (e) => workClickHandler(e) } 
        >
            <CldImage 
              src={work.meta.header_bg_image}
              sizes={ i === 0 ? `(min-width: 768px) 60vw, 50vw` : `(min-width: 768px) 20vw, 50vw`}
              alt={work.meta.title}
              width="2100"
              height="1400"
              objectFit="fill"
              loading= "lazy"
            />
          <div class="work-info">
            <h2 class="title"><span class="title-words">{work.meta.title}</span></h2>
            {#if work.meta.tags}
            <ul class="tags">
              {#each work.meta.tags as tag, index}
                <li class="tag">{tag}{index < work.meta.tags.length-1 ? ' | ' : ''}</li>
              {/each}
            </ul>
            {/if}
          </div>  
        </a>
      {/each}
    </div>
  <WorkCanvas 
    textsToCanvas={canvasTextElems}
    imgsToCanvas={canvasImgElems} 
    bulgeFactor={bulge.factor} 
  />
</div>

<style src="./work.scss" lang="scss"></style>