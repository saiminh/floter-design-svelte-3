<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
  import { CldImage } from 'svelte-cloudinary';
  export let data;

  gsap.registerPlugin(ScrollTrigger);

  let visible = false;

  function animForDesktop() {
    ScrollTrigger.getAll().forEach(t => t.kill());
    gsap.to('.heromask img', { duration: .6, x: "-10%", ease: "cubic.inOut" })
    gsap.from('.work', {
      xPercent: 100,
      duration: .66,
      ease: "cubic.out",
    })
    
    let heroheight = document.querySelector('.heromask')?.getBoundingClientRect().height || 100;
    gsap.fromTo('.heromask', {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
    },{
      clipPath: "polygon(0 0, 50% 0, 25% 100%, 0% 100%)",
      duration: .6,
      ease: "cubic.inOut",
      
      onComplete: () => {
        gsap.fromTo('.heromask', {
          clipPath: "polygon(0 0, 50% 0, 25% 100%, 0% 100%)",
        },{
          clipPath: "polygon(0 0, 30% 0, 25% 100%, 0% 100%)",
          duration: .6,
          ease: "none",
          scrollTrigger: {
            trigger: '.work',
            start: '0px 0px',
            end: `0px -${heroheight * 0.3}px`,
            scrub: true,
          }
        })
      }
    })
    
  }
  function animForMobile() {
    ScrollTrigger.getAll().forEach(t => t.kill());
    gsap.to('.heromask img', { duration: .6, x: 0, ease: "cubic.inOut" })
    gsap.from('.work', {
      opacity: 0,
      y: 100,
      duration: .66,
      ease: "cubic.inOut",
    })
    
    gsap.to('.heromask', {
      clipPath: "polygon(0 0, 100% 0, 100% 75%, 0% 100%)",
      duration: .6,
      ease: "cubic.inOut",

      onComplete: () => {
        gsap.to('.heromask', {
          ease: "power1.out",
          scrollTrigger: {
            trigger: '.work',
            start: '0px -10px',
            end: `0px -20px`,
            scrub: false,
            onEnterBack: () => {
              gsap.to('.heromask', {
                clipPath: "polygon(0 0, 100% 0, 100% 75%, 0% 100%)",
                duration: .6,
                ease: "expo.out",
              })
            },
            onEnter: () => {
              gsap.to('.heromask', {
                clipPath: "polygon(0 0, 100% 0, 100% 0%, 0% 0%)",
                duration: .6,
                ease: "expo.out",
              })
            }
          }
        })
      }
    })
  }
  function animForSize(){
    if ( window.matchMedia("(min-width: 768px) and (orientation: landscape)").matches ) {
      animForDesktop();
    } else {
      animForMobile();
    }
  }

  onMount(() => {
    
    visible = true;
    
    animForSize();
    
    let portrait = window.matchMedia("(orientation: portrait)");

    portrait.addEventListener("change", function(e) {
      animForSize();
    })

    // document.body.classList.add('work');
  })
  onDestroy(() => {
    // document.body.classList.remove('work');
  })
</script>

<svelte:document class="work" ></svelte:document>

<div class="heromask">
    <CldImage 
      src={data.header_bg_image}
      alt="{data.title}" 
      sizes="100vw"
      width={2100}
      height={1400}
      placeholder="blur"
      loading="eager"
      objectFit="fill"
    />
</div>
<div class="subnav">
  <a href="/work" class="subnav-item">← Back</a>
</div>
<article class="work">
  {#if visible}
  <div class="work-content">
    <h1><span class="svg-logo">{@html data.svg}</span><span class="name">{data.title}</span></h1>
    <div class="work-content-text">
      {@html data.Content.html}
    </div>
  </div>
  {/if}
</article>

<style lang="scss">
  article {
    width: 100vw;
    min-height: 100svh;
    overflow: hidden;
    padding-bottom: 60px;
    background-color: var(--color-bg);
  }
  .subnav {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 4;
    padding: var(--spacing-outer);
  }
  .heromask {
    position: fixed;
    top: 0;
    left:0;
    width: 100%;
    z-index: 2;
    height: auto;
    aspect-ratio: var(--aspect-ratio-heroes);
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
  }
  :global(.heromask img) {
    z-index: 0;
    display: block;
    position: relative;
    width: 100%;
    height: 100%;  
    aspect-ratio: var(--aspect-ratio-heroes);
    margin: 0;
    object-fit: fill;
  }
  .work-content {
    padding: 0 var(--spacing-outer);
    padding-top: calc(100vw / var(--aspect-ratio-heroes) + 1.5em);
    position: relative;
    z-index: 1;
    margin-top: 0;
    color: var(--color-text);
    
    @media screen and (min-width: 768px) {
      margin-left: 40vw;
      max-width: 60vw;
      padding-top: calc( 3 * var(--spacing-outer) );
      padding-left: calc(var(--spacing-outer) * 1.5);
      padding-right: calc(var(--spacing-outer) * 2.5);
      
    }
  }
  .work-content-text {
    @media screen and (min-width: 768px) {
      border-top: 1px solid var(--color-text);
    }
  }
  h1 {
    position: relative;
    z-index: 1;
    margin: 0;
    @media screen and (min-width: 768px) {
      padding: 0 0 1em 0;
    }
    
    & .name {
      display: none;
    }
    & .svg-logo :global(svg) {
      width: auto;
      height: auto;
      max-width: 250px;
      max-height: 80px;
      margin-bottom: 1em;

      @media screen and (min-width: 768px) {
        max-width: 400px;
        max-height: 200px;
      }
    }
  }
  :global(.header-nav){
    transition: all .3s cubic-bezier(0.075, 0.82, 0.165, 1);
  }
  :global(.work .header-nav){
    transform: translateY(100%);
  }
</style>