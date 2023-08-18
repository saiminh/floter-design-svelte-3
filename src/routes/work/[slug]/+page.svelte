<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { gsap } from 'gsap';
  import { fly } from 'svelte/transition';
  export let data;

  let visible = false;

  function animForDesktop() {
    gsap.to('.hero', { duration: .6, x: "-10%", ease: "cubic.inOut" })
    gsap.fromTo('.heromask', {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
    },{
      clipPath: "polygon(0 0, 50% 0, 25% 100%, 0% 100%)",
      duration: .6,
      ease: "cubic.inOut"
    })
  }
  function animForMobile() {
    gsap.to('.hero', { duration: .6, x: 0, ease: "cubic.inOut" })
    gsap.to('.heromask', {
      clipPath: "polygon(0 0, 100% 0, 100% 90%, 0% 100%)",
      duration: .6,
      ease: "cubic.inOut"
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
    let workheros = document.querySelector('.hero');
    console.log(workheros);
    visible = true;
    
    animForSize();
    window.addEventListener('resize', () => {
      animForSize();
    })

  })
</script>
<div class="heromask">
  <img class="hero" src="{data.header_bg_image}" alt="{data.title}" />
  <!-- <video class="herovid" autoplay muted loop playsinline>
    <source src="{data.video}" type="video/mp4">
  </video> -->
</div>
<div class="subnav">
  <a href="/work" class="subnav-item">← Back</a>
</div>
<article>
  {#if visible}
  <div class="work-content" in:fly={{ x: '10vw', duration: 400, delay: 400, opacity:0 }}>
    <h1>{@html data.svg}</h1>
    <div class="work-content-text">
      {@html data.Content.html}
    </div>
  </div>
  {/if}
</article>

<style lang="scss">
  article:after {
    content: '';
    position: fixed;
    right: 0; bottom: 0; left: 0;
    height: calc(36px + 2 * var(--spacing-outer));
    z-index: 1;
    border-top: 1px solid var(--color-text);
    background: #00117f;

    @media screen and (min-width: 768px) {
      content: none;
    }
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
    
    @media screen and (min-width: 768px) {
      position: fixed;
    }
  }
  .hero {
    width: 100%;
    height: 100%;
    object-fit: fill;
    z-index: 0;
    display: block;
    position: relative;
    perspective: 400px;
  }
  .herovid{
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
    display: block;
    position: absolute;
    top: -10%;
    left: -10%;
    perspective: 300px;
    animation: fadein 2s .5s both;
  }
  @keyframes fadein {
    from { opacity: 0; transform: rotateX(0deg); }
    to   { opacity: 1; transform: rotateX(45deg);}
  }
  .work-content {
    padding: var(--spacing-outer);
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
    border-top: 1px solid var(--color-text);
  }
  h1 {
    position: relative;
    z-index: 1;
  }
  h1 {
    max-width: 200px;
    margin: 0;
    padding: 0 0 1em 0;

    @media screen and (min-width: 768px) {
      max-width: 400px;
    }
  }
</style>