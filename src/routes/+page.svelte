<script lang='ts'>
  import HomeCanvas from '$lib/components/HomeCanvas.svelte';
  import Loader from '$lib/components/Loader.svelte';
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import ScrollTrigger from 'gsap/dist/ScrollTrigger';
  import SplitText from 'gsap/dist/SplitText';
  import HomeIlluDev from '$lib/components/HomeIlluDev.svelte';
  import HomeIlluShapes from '$lib/components/HomeIlluShapes.svelte';

  let canvasElems: Array<HTMLElement>;
  let imgElems: Array<HTMLElement>;
  let mounted = false;

  onMount( () => {

    mounted = true;

    gsap.registerPlugin( ScrollTrigger, SplitText );
    
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
        if (section.querySelector('.toCanvas')) {
          let splitp = new SplitText(section.querySelectorAll('.toCanvas'), { type: 'lines', linesClass: 'lineChildren' });
          gsap.set(splitp.lines, { transformOrigin: '0% 100%' });
          gsap.set(splitp.lines, { yPercent: 100, opacity: 0 });
          gsap.to(splitp.lines, { duration: 1, yPercent: 0, opacity: 1, stagger: 0.05, ease: 'power4.out', 
            scrollTrigger: { trigger: splitp.lines, start: 'top 80%', end: 'bottom 40%', scrub: false }
          })  
        }
      }

    })
    canvasElems = Array.from(document.querySelectorAll('.lineChildren, .wordChildren'));
    imgElems = Array.from(document.querySelectorAll('img'));
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
  <section class="splash"> 
    <h1>Hallo! I'm Simon.<br> I forge websites<br/><em>that stand out</em> with great beauty.</h1>
  </section>
  <section class="intro">
    <figure class="intro-image">
      <HomeIlluDev />
    </figure>
    <h2><em>Creative</em> Development</h2> 
    <p class="toCanvas">I specialise in fashioning exquisitly tailored websites and webapps for the discerning enterprise executive.</p> 
    <div class="cta">
      <a href="/service" class="button">My Services</a>
      <a href="/work" class="button button--primary">Hire Simon</a>
    </div>
  </section>
  <section class="design">
    <figure class="design-illu">
      <HomeIlluShapes />
    </figure>
    <h2>Visual Design</h2> 
    <p class="toCanvas">With years in the craft, I've mastered the art of designing websites, user interfaces, illustrations, house styles, and everything betwixt.</p>
    <div class="cta">
      <a href="/service" class="button">My Services</a><a href="/work" class="button button--primary">Hire Simon</a>
    </div>
  </section>
  <section class="more">
    <h2>I create products that help great companies reach their audiences.</h2>
    <div class="cta">
      <a href="/work" class="button button--xl">Reach out!</a>
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
    padding: var(--spacing-outer);
    min-height: 100svh;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-outer);
    justify-content: center;

    @media screen and (min-width: 768px) {
      max-width: 75vw;
      margin: 0 auto;
      gap: 0;
    }
  }
  .splash {
    display: flex;
    flex-direction: column;
    justify-content: start;
    min-height: 100svh;
    justify-content: center;
    margin-bottom: -1em;
    max-width: 100%;
    padding: var(--spacing-outer);
    
    @media screen and (min-width: 768px) {
      padding: var(--spacing-outer) calc(var(--spacing-outer) * 2);
    }
  }
  .intro-image {
    position:relative; 
    left: 0; 
    text-align: center; 
    display: block; 
    margin: 0 0 -.5em 0; 
    z-index: -2;
  }
  .design {
    overflow: hidden;
  }
  .design-illu {
    position:relative; 
    left: 0; 
    width: 40%;
    margin: 0 auto; 
    text-align: center; 
    display: block; 
    margin-bottom: -1em; 
    z-index: -2;
  }
  h1, h2 {
    line-height: 1.1;
    visibility: hidden;
    margin: 0;
    -webkit-touch-callout: none; /* Safari */
    -webkit-user-select: none; /* Chrome */     
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; 
  }
  h1 {
    line-height: 1;
    font-size: 11vw;
    margin-top: -.5em;
    letter-spacing: -0.05em;
    opacity: 0;
    
    @media screen and (min-width: 768px) {
      font-size: 9vw;
      line-height: .9;
    }
    & em {
      color: var(--color-highlight);
      font-style: normal;
    }
  }
  h2 {
    font-size: 1.5em;
    letter-spacing: -0.033em;
    margin-bottom: 0;
    line-height: .9;
    
    & em {
      color: var(--color-highlight);
      font-style: normal;
    }
  }
  .toCanvas {
    visibility: hidden;
    font-size: .66em;
    margin: 1.25em 0 0.25em 0;
    -webkit-touch-callout: none; /* Safari */
    -webkit-user-select: none; /* Chrome */     
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; 
    @media screen and (min-width: 768px) {
      font-size: 0.5em;
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
    margin-top: 0em;
    padding-top: 0em;
    text-align: center;
    @media screen and (min-width: 768px) {
      // background-color: var(--color-bg);
      // border-top: 1px solid var(--color-text);
      padding-top: 1em;
      margin-top: 2em;
    }
  }
</style>