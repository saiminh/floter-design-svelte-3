<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
  import ScrollToPlugin from 'gsap/dist/ScrollToPlugin';
  import { CldImage, CldVideoPlayer } from 'svelte-cloudinary';
  export let data;

  gsap.registerPlugin(ScrollTrigger);

  let visible = false;

  onMount(() => {
    visible = true;
    if (document.querySelector('.workclone')) {
      document.querySelector('.workclone')?.remove();
    }
    gsap.to('.logo-wrapper', {
      opacity: 0,
      zIndex: -1,
      duration: 1,
      ease: 'power2.out',
    })
    gsap.from('.work', {
      y: '100vh',
      duration: 1,
      ease: 'power4.out',
    })
    gsap.from('.gallery-wrapper', {
      y: '-100vh',
      duration: 1,
      ease: 'power4.out',
    })

    const gallery = document.querySelector('.gallery') as HTMLElement;
    let startX: number;
    let scrollLeft: number;
    let isDown = false;
    if (gallery) {
      gallery.addEventListener('mousedown', (e) => {
        e.preventDefault();
        gallery.style.scrollSnapType = 'none';
        gallery.style.scrollBehavior = 'auto';
        isDown = true;
        startX = e.pageX;
        scrollLeft = gallery.scrollLeft;
      });
      gallery.addEventListener('mouseleave', () => {
        isDown = false;
      });
      gallery.addEventListener('mouseup', () => {
        isDown = false;
      });
      gallery.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX;
        const walk = (x - startX) * 4; //scroll-fast
        gallery.scrollLeft = scrollLeft - walk;
      });
    }

    
    return () => {
      gsap.killTweensOf('.logo-wrapper, .work, .gallery-wrapper');
    }
  })
  
</script>

<div class="logo-wrapper">
  <div class="svg-logo">{@html data.svg}</div>
</div>
<div class="subnav">
  <a href="/work" class="subnav-item button">← Back</a>
</div>
<div class="gallery-wrapper">
  <div class="gallery">
    {#if visible}
    {#each data.images as image}
      <figure>
        {#if image.includes('/video/')}
          <video src={image} width="1400" height="840" autoplay muted loop></video>  
        {:else}
        <CldImage 
          src={image}
          alt="{data.title}" 
          sizes="(min-width: 768px) 67vw, 90vw"
          width={1400}
          height={840}
          placeholder="blur"
          loading="eager"
          objectFit="cover"
        />
        {/if}
      </figure>  
    {/each}
    {/if}
  </div>
</div>
<article class="work">
{#if visible}
  <h1>{data.title}</h1>
  <div class="description">
    {data.description}
  </div>
  <div class="work-content">
    <div class="infobox">
      <div class="tasks">
        <div class="tasks-title">What I did:</div>
        <ul>
          {#each data.tags as tag }
            <li>{tag}</li>
          { /each }
        </ul>
      </div>
      <div class="reference">
        <div class="reference-title">Reference:</div>
        <div><a href={data.reference}>{data.referenceName}</a></div>
      </div>
      {#if data.agency}
      <div class="agency">
        <div class="agency-title">Agency:</div>
        <div><a href={data.agency}>{data.agencyName}</a></div>
      </div>
      {/if}
    </div>
    <div class="work-content-text">
      {@html data.Content.html}
    </div>
  </div>
{/if}
</article>

<style lang="scss">
  .subnav {
    position: fixed;
    z-index: 22;
    @media screen and (min-width: 768px) {
      top: 0;
      left: 0;
      display: inline-block;
    }
  }
  .subnav-item {
    margin: var(--spacing-nav);
  }
  .logo-wrapper {
    position: fixed;
    text-align: center;
    width: 100vw;
    height: 100vh;
    z-index: 1;
  }
  .svg-logo {
    color: var(--color-highlight);
    padding: 3em;
    width: 100%;
    height: 100%;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    @media screen and (min-width: 768px) {
      width: 60%;
    }
  }
  :global(.svg-logo svg) {
    object-fit: fill;
    width: 100%;
    height: 100%;
  }
  .work {
    overflow: hidden;
    padding: 0 var(--spacing-outer) 100px var(--spacing-outer);
    @media screen and (min-width: 768px) {
      margin: 0 var(--spacing-outer) 0 150px;
      padding: 0 var(--spacing-outer) 100px var(--spacing-outer);
      width: calc(100% - 150px - var(--spacing-outer));
    }
  }
  h1 {
    margin: .5em 0 0.25em 0;
    font-size: 2.5rem;
    @media screen and (min-width: 768px) {
      font-size: 5rem;
    }
  }
  .description {
    margin-bottom: 1.5em;
    line-height: 1.3;
    letter-spacing: -0.0075em;
    font-size: 1.25rem;
    @media screen and (min-width: 768px) {
      font-size: 2.5rem;
    }
  }
  .infobox {
    font-size: 1.25rem;
    padding: 0 0 2em 0;
    
    @media screen and (min-width: 768px) {
      flex: 0 0 25%;
    }
  }
  .reference-title, .agency-title, .tasks-title {
    font-weight: bold;
    font-style: italic;
    margin: 0 0 .125em 0;
  }
  .reference-title, .agency-title {
    margin-top: 1em;
    margin-bottom: 0;
  }
  .tasks ul {
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    gap: .125em;
  }
  .tasks li {
    font-size: 1rem;
    list-style: none;
    border: none;
    text-transform: uppercase;
    border-radius: 3px;
    margin: 0;
    padding: 0.25em 0.33em;
    background-color: var(--color-highlight);
    color: var(--color-bg);
  }
  .work-content {
    position: relative;
    z-index: 2;
    @media screen and (min-width: 768px) {
      display: flex;
      gap: 2em;
    }
  }
  .work-content-text :global(h2) {
    font-size: 2rem;
    @media screen and (min-width: 768px) {
      font-size: 2.5rem;
    }
  }
  .work-content-text > :global(:first-child) {
    margin-top: 0;
  }
  .work-content-text :global(p) {
    font-size: 1rem;
    @media screen and (min-width: 768px) {
      font-size: 1em;
    }
  }
  .work-content-text > :global(h1):first-child {
    margin-top: 0;
  }
  .gallery-wrapper {
    position: relative;
    width: 100vw;
    overflow: hidden;
    padding: 0 0 1em 0;
    z-index: 1;
    // opacity: 0.75;
    perspective: 250px;
    perspective-origin: center bottom;
    @media screen and (min-width: 768px) {
      margin-bottom: -80px;
      top: -80px;
      padding: 2em 0 4em 0;
      margin-bottom: -120px;
      perspective: 500px;
    }
  }
  .gallery {
    transform-origin: 50% 50%;
    position: relative;
    display: flex;
    scroll-behavior: smooth;
    gap: 1px;
    overflow-x: scroll;
    scroll-snap-type: x mandatory;
    width: 115vw;
    left: -4vw;
    cursor: grab;
    transform: rotate3d(-2, 0, 1, -10deg);
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
    @media screen and (min-width: 768px) {
      width: 110vw;
      left: -3vw;
      transform: rotate3d(-2, 0, 1, -10deg);
    }
  }
  figure {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    justify-content: center;
    scroll-snap-align: start;
    flex: 1 0 85%;
    background-color: var(--color-highlight);
    height: 100%;
    aspect-ratio: 140/84;
    background-color: var(--color-text);
    width: auto;
    margin: 0;
    @media screen and (min-width: 768px) {
      flex: 1 0 66.666%;
    }
    
    & :global(img), video {
      opacity: 0.85;
      width: 100%;
      height: 100%;
      object-position: left top;
    }
    video {
      object-fit: cover;
    }
  }
</style>