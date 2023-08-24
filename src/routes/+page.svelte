<script lang='ts'>
  import HomeCanvas from '$lib/components/HomeCanvas.svelte';
  import Loader from '$lib/components/Loader.svelte';
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import ScrollTrigger from 'gsap/dist/ScrollTrigger';
  import SplitText from 'gsap/dist/SplitText';

  let canvasElems: Array<HTMLElement>;
  let mounted = false;
  
  onMount( () => {

    mounted = true;

    gsap.registerPlugin( ScrollTrigger, SplitText );
    
    const sections = document.querySelectorAll('section');
    
    sections.forEach( (section) => {
      if ( section.classList.contains('splash')){
        let split = new SplitText(section.querySelectorAll('h1'), { type: 'words', wordsClass: 'lineChildren' });
        gsap.set(split.words, {
          opacity: 0,
          y: 60,
          transformOrigin: '50% 100%'
        })
        gsap.to(split.words, {
          duration: 0.5,
          opacity: 1,
          y: 0,
          stagger: 0.033,
          ease: 'back.out',
          delay: .3
        })
      }
      else {
        let split = new SplitText(section.querySelectorAll('h2'), { type: 'lines', linesClass: 'lineChildren' });
        gsap.set(split.lines, { transformOrigin: '0% 100%' });
        gsap.set(split.lines, { yPercent: 100, opacity: 0 });
        gsap.to(split.lines, { duration: 1, yPercent: 0, opacity: 1, stagger: 0.1, ease: 'power4.out', 
          scrollTrigger: { trigger: split.lines, start: 'top 90%', end: 'bottom 70%', scrub: false }
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
    canvasElems = Array.from(document.querySelectorAll('.lineChildren'));

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
    <h1>Simon Flöter creates products that stand out.</h1>
  </section>
  <section class="intro">
    <h2>As a Creative Web Developer ...</h2> 
    <p>I specialise in delivering beautifully crafted bespoke websites.</p> 
    <div class="cta">
      <a href="/work" class="button">Learn More</a>
      <a href="/work" class="button button--primary">Hire Simon</a>
    </div>
  </section>
  <section class="more">
    <h2>As a UX & Graphic Designer...</h2> 
    <p>I have designed Websites, Housestyles, Typefaces, Advertising campaigns and Print publications for them.</p>
    <div class="cta">
      <a href="/work" class="button">Learn More</a>
      <a href="/work" class="button button--primary">Hire Simon</a>
    </div>
  </section>
  <section class="more">
    <h2>I create products that help great companies reach their audiences. Need help?</h2>
    <div class="cta">
      <a href="/work" class="button button--xl">Reach out!</a>
    </div>
  </section>
</article>
<HomeCanvas textsToCanvas={canvasElems}/>
<style lang="scss">
  .scroller {
    font-size: clamp(32px, 4.5vw, 4.5vw);
  }
  section {
    scroll-snap-align: start;
    box-sizing: border-box;
    padding: var(--spacing-outer);
    overflow: hidden;

    @media screen and (min-width: 768px) {
      padding: var(--spacing-outer) calc(var(--spacing-outer) * 2.5);
    }
    &:last-child{
      padding-bottom: 50svh;
    }
  }
  .splash {
    display: flex;
    flex-direction: column;
    justify-content: start;
    min-height: 100svh;
    justify-content: center;
    padding: var(--spacing-outer);
    margin-bottom: -1em;
  }
  h1, h2 {
    line-height: 1.1;
    letter-spacing: -0.025em;
    font-weight: 400;
    font-style: normal;
    visibility: hidden;
    margin: 0;
    -webkit-touch-callout: none; /* Safari */
    -webkit-user-select: none; /* Chrome */     
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; 
  }
  h1 {
    letter-spacing: -0.05em;
    line-height: .9;
    font-size: 17vw;
    margin-top: -.5em;
    // text-align: center;
    @media screen and (min-width: 768px) {
      font-size: 12vw;
    }
  }
  h2 {
    font-size: 1.25em;
    font-weight: 800;
    font-style: italic;
    margin-bottom: .5em;
  }
  p {
    font-size: 0.7em;
    -webkit-touch-callout: none; /* Safari */
    -webkit-user-select: none; /* Chrome */     
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; 
  }
  a {
    -webkit-touch-callout: none; /* Safari */
    -webkit-user-select: none; /* Chrome */     
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; 
  }
</style>