<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import ScrollToPlugin from 'gsap/dist/ScrollToPlugin';
  import { CldImage } from 'svelte-cloudinary';
  export let data;

  let visible = false;

  onMount(() => {

    gsap.registerPlugin(ScrollToPlugin);

    visible = true;

    let is_landscape = window.matchMedia('(orientation:landscape)').matches

    window.addEventListener('resize', () => {
      is_landscape = window.matchMedia('(orientation:landscape)').matches
    })

    if (document.querySelector('.workclone')) {
      document.querySelector('.workclone')?.remove();
    }

    setTimeout( () => {
      document.querySelectorAll('.gallery img')?.forEach( image => {
        const img = image as HTMLImageElement;
        if (!img.complete) {
          img.classList.add('imageIsLoading');
          img.onload = () => {
            gsap.fromTo(img, {
              autoAlpha: 0,
              scale: 1.2,
            }, {
              autoAlpha: 1,
              scale: 1,
              duration: 1,
              ease: 'power4.out',
            })
          }
        }
      })
    }, 10)

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
    let isAnimating = false;
    const galleryClickHandler = (e: MouseEvent) => {
      if (isAnimating) return;
      const allImgs = gallery.querySelectorAll('figure');
      const scrollX = gallery.scrollLeft;
      const imgWidth = allImgs[0].offsetWidth || 0;
      const imgCount = allImgs.length;
      const galleryOuterWidth = (document.querySelector('.gallery-wrapper') as HTMLElement)?.offsetWidth || 0;
      const galleryOverlap = imgWidth - galleryOuterWidth % imgWidth;
      const maxScrollX = imgWidth * (imgCount - 1);
      const imgIndex = scrollX < maxScrollX ? Math.round(scrollX / imgWidth) : imgCount - 1;
      let newScrollPos;
      if (imgIndex < imgCount - 2) {
        newScrollPos = scrollX + imgWidth;
      } 
      else if ( imgIndex === imgCount - 2){
        newScrollPos = is_landscape ? scrollX + galleryOverlap * .8 : scrollX + galleryOverlap * .85 ;
      } 
      else {
        newScrollPos = 0;
      }
      gsap.to(gallery, {
        scrollTo: { x: newScrollPos , autoKill: false },
        duration: .75,
        ease: 'power4.out',
        onStart: () => { isAnimating = true },
        onComplete: () => { isAnimating = false },
      })
    }

    const hoverElement = document.createElement('div');
    hoverElement.classList.add('hoverElement');

    document.querySelector('.gallery-wrapper')?.appendChild(hoverElement);

    const galleryHoverHandler = (e: MouseEvent) => {
      gsap.to(hoverElement, { x: e.clientX, y: e.clientY + 25, rotateX: 10, rotateZ: -5, autoAlpha: 1, duration: 0.3, overwrite: true }) 
    }
    const galleryLeaveHandler = (e: MouseEvent) => {
      gsap.to(hoverElement, { autoAlpha: 0, duration: 0.3, overwrite: true }) 
    }

    if (gallery) {
      gallery.addEventListener('click', galleryClickHandler )
      gallery.addEventListener('mousemove', galleryHoverHandler )
      gallery.addEventListener('mouseleave', galleryLeaveHandler )
    }

    
    return () => {
      gsap.killTweensOf('.logo-wrapper, .work, .gallery-wrapper')
      gallery.removeEventListener('click', galleryClickHandler )
      gallery.removeEventListener('mousemove', galleryHoverHandler )
      gallery.removeEventListener('mouseleave', galleryLeaveHandler )
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
    gap: 0;
    overflow-x: scroll;
    scroll-snap-type: x mandatory;
    width: 115vw;
    left: -4vw;
    transform: rotate3d(-2, 0, 1, -10deg);
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
    @media screen and (min-width: 768px) {
      width: 110vw;
      left: -3vw;
    }
  }
  figure {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    justify-content: center;
    scroll-snap-align: start;
    padding: 0 1px;
    flex: 1 0 85%;
    height: 100%;
    aspect-ratio: 140/84;
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
  :global(.imageIsLoading) {
    visibility: hidden;
    opacity: 0;
  }
  :global(.hoverElement) {
    position: fixed;
    top: 0;
    left: 0;
    width: 50px;
    height: 50px;
    background-color: var(--color-bg);
    z-index: 100;
    opacity: 0;
    visibility: hidden;
    box-shadow: -4px 4px 8px rgba(0,0,0,.2);
    pointer-events: none;
    @media screen and (pointer: coarse) {
      display: none;
    }

    &:before {
      content: url('/moveright.svg');
      font-size: 33px;
      line-height: 50px;
      text-align: center;
      display: block;
      height: 50px;
      width: 50px;
    }
  }
</style>