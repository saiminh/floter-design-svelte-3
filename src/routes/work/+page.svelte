<script lang="ts">
  import WorkCanvas from '$lib/components/WorkCanvas.svelte';
  import { onMount, onDestroy } from 'svelte';
  import gsap from 'gsap';
  import ScrollTrigger from 'gsap/dist/ScrollTrigger';
  import SplitText from 'gsap/dist/SplitText';

  export let data;

  let canvasTextElems: Array<HTMLElement>;
  let canvasImgElems: Array<HTMLElement>;
  let bulge = { factor: 0.15 };
  
    onMount(() => {
    
    gsap.registerPlugin( ScrollTrigger, SplitText );
    
    let h1 = document.querySelector('h1') as HTMLElement;
    let h1Text = h1?.innerHTML || '';
    h1.innerHTML = h1Text + h1Text + h1Text + h1Text || '';
    h1.style.overflow = 'hidden';
    h1.style.whiteSpace = 'nowrap';

    h1.querySelectorAll('span').forEach((span) => {
      gsap.to(span, {xPercent: -100, duration: 4, ease: 'none', repeat: -1 })
    });

    const split = new SplitText('h1', { type: 'words', wordsClass: 'words' });
    gsap.set(split.words, { opacity: 0 });
    
    canvasTextElems = Array.from(document.querySelectorAll('.words'));
    gsap.set(canvasTextElems, {
      opacity: 0, yPercent: -10
    })
    gsap.to(canvasTextElems, {
      duration: 1,
      opacity: 1,
      yPercent: 0,
      stagger: 0.1,
      ease: 'power4.out',
    })

    canvasImgElems = Array.from(document.querySelectorAll('.workhero'));
    gsap.set(canvasImgElems, {
      opacity: 0, yPercent: -10
    })
    gsap.to(canvasImgElems, {
      duration: 1,
      opacity: 1,
      yPercent: 0,
      stagger: 0.1,
      ease: 'power4.out',
    })
  });

  function workClickHandler(e:Event){
    e.preventDefault();
    const target = e.target as HTMLElement;
    const originalLink = target.getAttribute('href') as string;
    const targetImg = target.querySelector('.workhero') as HTMLElement;
    const targetImgRect = targetImg.getBoundingClientRect();
    const targetImgAspectRatio = targetImgRect.width / targetImgRect.height;
    target.classList.add('active');
    targetImg.style.width = `${targetImgRect.width}px`;
    targetImg.style.height = `${targetImgRect.height}px`;
    targetImg.style.top = `${targetImgRect.top}px`;
    targetImg.style.left = `${targetImgRect.left}px`;
    targetImg.style.position = 'fixed';

    gsap.to('.work:not(.active) .workhero', {
      duration: .3,
      opacity: 0,
      yPercent: 10,
      stagger: 0.1,
      ease: 'power4.out',
    })
    gsap.set(targetImg, {
      zIndex: 100,
    })
    gsap.to(targetImg, {
      duration: .6,
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerWidth / targetImgAspectRatio,
      ease: 'circ.inOut',
      delay: .3,
    })
    gsap.to(bulge, {
      duration: .3,
      factor: 0,
      ease: 'circ.inOut',
      onUpdate: () => {
        bulge.factor = bulge.factor;  
      }
    })
    gsap.to('h1', {
      duration: .3,
      yPercent: -200,
      ease: 'circ.inOut',
    })

    // after a timeout of 1000ms (1s), navigate to the original link
    setTimeout(() => {
      window.location.href = originalLink;
    }, 1000);
  }

</script>

<h1><span>Casestudies</span></h1>
<div class="works">
  
  {#each data.posts as work}
    <a href="{work.path}" class="work" on:click={ workClickHandler }>
      <img class="workhero" src="{work.meta.header_bg_image}" alt="{work.meta.title}"/>
      <h2>{work.meta.title}</h2>
    </a>

  {/each}
  {#each data.posts as work}
    <a href="{work.path}" class="work" on:click={ workClickHandler }>
      <img class="workhero" src="{work.meta.header_bg_image}" alt="{work.meta.title}"/>
      <h2>{work.meta.title}</h2>
    </a>

  {/each}
  {#each data.posts as work}
    <a href="{work.path}" class="work" on:click={ workClickHandler }>
      <img class="workhero" src="{work.meta.header_bg_image}" alt="{work.meta.title}"/>
      <h2>{work.meta.title}</h2>
    </a>

  {/each}
  {#each data.posts as work}
    <a href="{work.path}" class="work" on:click={ workClickHandler }>
      <img class="workhero" src="{work.meta.header_bg_image}" alt="{work.meta.title}"/>
      <h2>{work.meta.title}</h2>
    </a>

  {/each}
</div>
<WorkCanvas textsToCanvas={canvasTextElems} imgsToCanvas={canvasImgElems} bulgeFactor={bulge.factor} />


<style lang="scss">
  h1 {
    font-size: 12vw;
    font-style: italic;
    margin: 0.5em 0 0.5em 0;
    letter-spacing: -0.04em;
    text-align: center;
    position: fixed;
    top: 0;
    width: 100%;
    visibility: hidden;
    
    @media screen and (min-width: 768px) {
      font-size: 7vw;
    } 

    & span {
      display: inline-block;
      padding: 0 0.25em;
    }
  }
  h2 {
    line-height: 1.1;
    letter-spacing: -0.025em;
    font-weight: 400;
    font-size: 2vw;
    // visibility: hidden;
    opacity: 0;
    position: absolute;
    right: 0%;
    top: 0%;
    transform: scale(0.8);
    margin: 0;
    padding: 0.1em 0.4em 0.2em 0.4em;
    border-radius: .25em;
    color: var(--color-bg);
    text-align: center;
    transform-origin: center center;
    width: auto;
    margin: 0;
    background-color: var(--color-text);
    transition: all .3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    
    .works .work:hover & {
      opacity: 1;
      transform: scale(1);
    }
  }
  .works {
    padding: 24vw 0.5em 0.5em 0.5em;
    @media screen and (min-width: 768px) {
      padding: 14vw 0.5em 0.5em 0.5em;
      display: flex;      
      flex-wrap: wrap;
      gap: 0.25em;
      width: 100%;
      padding-bottom: 20svh;
    }
  }
  .work {
    flex: 0 0 calc(33% - .125em);
    display: block;
    position: relative;
    padding: 0;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    text-decoration: none;
    overflow: hidden;
    // visibility: hidden;
  }
  .workhero {
    width: 100%;
    // aspect-ratio: 4/3;
    object-fit: cover;
    visibility: hidden;
    display: block;
  }
</style>