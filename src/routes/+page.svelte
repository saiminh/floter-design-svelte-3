<script lang='ts'>
  import HomeCanvas from '$lib/components/HomeCanvas.svelte';
  import Loader from '$lib/components/Loader.svelte';
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import ScrollTrigger from 'gsap/dist/ScrollTrigger';
  import ScrollToPlugin from 'gsap/dist/ScrollToPlugin';
  import { goto } from '$app/navigation';
  import SplitText from 'gsap/dist/SplitText';
  import HomeIlluDev from '$lib/components/HomeIlluDev.svelte';
  import HomeIlluShapes from '$lib/components/HomeIlluShapes.svelte';

  let canvasElems: Array<HTMLElement>;
  let imgElems: Array<HTMLElement>;
  let mounted = false;
  let currentMonth: string;

  onMount( () => {
    currentMonth = new Date().toLocaleString('en-UK', { month: 'long', year: 'numeric' });
    mounted = true;

    gsap.registerPlugin( ScrollTrigger, ScrollToPlugin, SplitText );
    
    const sections = document.querySelectorAll('section');

    sections.forEach( (section) => {
      if ( section.classList.contains('splash')){
        let split = new SplitText(section.querySelectorAll('h1'), { type: 'words', wordsClass: 'wordChildren' });
        split.words.forEach( (word) => {
          word.innerHTML = word.innerHTML.replace(' ', '');
        })
        gsap.set(split.words, {
          opacity: 1,
          y: -window.innerHeight,
          transformOrigin: '50% 100%'
        })
        gsap.to(split.words, {
          duration: 1,
          opacity: 1,
          y: 0,
          stagger: -0.01,
          ease: 'elastic.out(1, .5)',
          delay: .3
        })
      }
      else {
        let split = new SplitText(section.querySelectorAll('h2'), { type: 'words', wordsClass: 'wordChildren' });
        split.words.forEach( (word) => {
          word.innerHTML = word.innerHTML.replace(' ', '');
        })
        gsap.set(split.words, { transformOrigin: '0% 100%' });
        gsap.set(split.words, { yPercent: 100, opacity: 0 });
        gsap.to(split.words, { duration: 1, yPercent: 0, opacity: 1, stagger: 0.05, ease: 'power4.out', 
          scrollTrigger: { trigger: split.words, start: 'top 90%', end: 'bottom 70%', scrub: false }
        })  
        if (section.querySelector('p')) {
          let splitp = new SplitText(section.querySelectorAll('p'), { type: 'lines', linesClass: 'lineChildren' });
          gsap.set(splitp.lines, { transformOrigin: '0% 100%' });
          gsap.set(splitp.lines, { yPercent: 100, opacity: 0 });
          gsap.to(splitp.lines, { duration: 1, yPercent: 0, opacity: 1, stagger: 0.05, ease: 'power4.out', 
            scrollTrigger: { trigger: splitp.lines, start: 'top 80%', end: 'bottom 40%', scrub: false }
          })  
        }
      }
    })
    
    canvasElems = Array.from(document.querySelectorAll('.canvasized .lineChildren, .canvasized .wordChildren'));
    imgElems = Array.from(document.querySelectorAll('img'));

    sections.forEach(section => {
      //create a click eventlistener, that will scroll to the next section
      section.addEventListener('click', (e) => {
        e.preventDefault();
        //if the cursor is over a link, don't scroll and open the link's href location
        let target = e.target as HTMLElement;
        if (target?.closest('a')) {
          goto(target.closest('a')?.getAttribute('href') || '');
          return;
        }
        
        let nextSection = section.nextElementSibling as HTMLElement;
        if (nextSection) {
          gsap.to(window, { duration: .9, scrollTo: nextSection, ease: 'power4.inOut' })
        }
      }) 
    })

    return () => {
      gsap.killTweensOf(canvasElems);
      ScrollTrigger.getAll().forEach( instance => instance.kill() );
    }
  });

</script>

{#if !mounted}
  <Loader />
{/if}
<article class="scroller">
  <section class="canvasized splash"> 
    <h1 class="align-middle">I create digital experiences that <em>stand out</em> from the rest.</h1>
  </section>
  <section class="dev">
    <figure class="dev-image">
      <HomeIlluDev />
    </figure>
    <h2>Creative Development</h2> 
    <p>I create exquisitly tailored web experiences for discerning enterprises and their audiences.</p> 
    <div class="cta">
      <a href="/service" class="button">Services <span class="hide-on-mobile"> I provide</span></a>
      <a href="/contact" class="button button--primary">Contact me</a>
    </div>
  </section>
  <section class="design">
    <figure class="design-illu">
      <HomeIlluShapes />
    </figure>
    <h2>Visual Design</h2> 
    <p>I'm a seasoned designer, with a long list of succesfull projects and happy clients.</p>
    <div class="cta">
      <a href="/work" class="button">Work <span class="hide-on-mobile"> I've done</span></a>
      <a href="/contact" class="button button--primary">Contact me</a>
    </div>
  </section>
  <section class="canvasized hireme">
    <h2 class="align-middle">I am currently available <em>for freelance work.</em></h2>
    {#if mounted}
    <div class="hireme-date">(as of { currentMonth })</div>
    {/if}
    <div class="cta" style="text-align: center">
      <a href="/contact" class="button button--xl button--primary">Get in touch</a>
    </div>
  </section>
</article>
<HomeCanvas textsToCanvas={canvasElems} imgsToCanvas={imgElems}/>
<div class="canvasResizeToThis"></div>

<style lang="scss">
  .canvasResizeToThis {
    position: fixed;
    top: -10vh;
    left: -10vw;
    width: 120vw;
    height: 120vh; 
    pointer-events: none;
    z-index: -1;
  }
  .scroller {
    font-size: clamp(32px, 4.5vw, 4.5vw);
  }
  section {
    scroll-snap-align: start;
    box-sizing: border-box;
    padding: 0 var(--spacing-outer);
    min-height: 100svh;
    display: flex;
    flex-direction: column;
    gap: 0;
    justify-content: center;

    @media screen and (orientation: landscape) {
      max-width: 75vw;
      margin: 0 auto;
    }
  }
  .splash {
    display: flex;
    flex-direction: column;
    justify-content: start;
    min-height: 100svh;
    justify-content: center;
    max-width: 100%;
    padding: var(--spacing-outer);
    cursor: url('/pointer.svg'), auto;
    
    @media screen and (orientation: landscape) {
      padding: 0 calc(var(--spacing-outer) * 2);

      & h1 {
        margin: -.5em 0 0 0;
      }
    }
  }
  .dev-image {
    position:relative; 
    left: 0; 
    text-align: center; 
    display: block; 
    z-index: -2;
    margin: -2em 0 -.5em 0; 
    @media screen and (orientation: landscape) {
      margin: -1.5em 0 -.5em 0; 
    }
  }
  .design {
    overflow: hidden;
  }
  .design-illu {
    position:relative; 
    left: 0; 
    width: 60%;
    margin: 0 auto; 
    text-align: center; 
    display: block; 
    margin: 0 auto 1em auto; 
    z-index: -2;
    
    @media screen and (orientation: landscape) {
      margin: 0 auto .5em auto; 
      width: 45%;
    }
  }
  .hireme {
    @media screen and (orientation: landscape) {
      max-width: 95vw;
    }
  }
  .hireme h2 {
    font-size: 12.5vw;
    margin-bottom: 1.5em;
    @media screen and (orientation: landscape) {
      font-size: 8vw;
      margin-bottom: 0.5em;
      margin-top: 0;
      padding: 0 .25em;
    }
  }
  .hireme-date {
    font-size: .66em;
    text-align: center;
    letter-spacing: -0.02em;
  }
  h2 {
    font-size: 12vw;
    line-height: .9;
    letter-spacing: -0.033em;
    margin: 0 0 0.5em 0;
    -webkit-touch-callout: none; /* Safari */
    -webkit-user-select: none; /* Chrome */     
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; 
    cursor: url('/pointer.svg'), auto;
    @media screen and (orientation: landscape) {
      font-size: 6vw;
      margin: 0;
    }
    & > em {
      font-style: normal;
      font-weight: 400;
      color: var(--color-highlight);
    }
  }
  h1 {
    line-height: .85;
    font-size: 14.75vw;
    letter-spacing: -0.05em;
    color: var(--color-highlight);
    -webkit-touch-callout: none; /* Safari */
    -webkit-user-select: none; /* Chrome */     
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; 
    
    @media screen and (orientation: landscape) {
      font-size: 10vw;
      padding: 0 1em;
    }
    & > em {
      font-style: normal;
      font-weight: 400;
      color: var(--color-text);
    }
  }
  .canvasized h1, .canvasized h2 {
    opacity: 0;
    visibility: hidden;
  }
  p {
    font-size: .66em;
    margin: 0 0 1em 0;
    @media screen and (orientation: landscape) {
      margin: 1em 0 0.25em 0;
      font-size: 0.6em;
      letter-spacing: -0.02em;
    }
  }
  a {
    -webkit-touch-callout: none; /* Safari */
    -webkit-user-select: none; /* Chrome */     
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; 
  }
  .cta {
    margin-top: .5em;
    padding-top: 0em;
    @media screen and (orientation: landscape) {
      // background-color: var(--color-bg);
      // border-top: 1px solid var(--color-text);
      padding-top: 1em;
      margin-top: 0em;
    }
  }
</style>