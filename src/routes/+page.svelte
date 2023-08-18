<script lang='ts'>
  import HomeCanvas from '$lib/components/HomeCanvas.svelte';
  import { gsap } from 'gsap';
  import ScrollTrigger from 'gsap/dist/ScrollTrigger';
  import SplitText from 'gsap/dist/SplitText';
  import { onMount, onDestroy } from 'svelte';

  let canvasElems: Array<HTMLElement>;

  onMount(() => {
    
    gsap.registerPlugin( ScrollTrigger, SplitText );
    
    const sections = document.querySelectorAll('section');
    
    sections.forEach( (section) => {
      if ( section.classList.contains('splash')){
        let split = new SplitText(section.querySelectorAll('h1'), { type: 'lines', linesClass: 'lineChildren' });
        gsap.set(split.lines, {
          opacity: 1,
          y: window.innerHeight,
        })
        gsap.to(split.lines, {
          duration: 1,
          opacity: 1,
          y: 0,
          stagger: 0.075,
          ease: 'power4.out',
        })
      }
      else {
        let split = new SplitText(section.querySelectorAll('h2'), { type: 'lines', linesClass: 'lineChildren' });
        gsap.set(split.lines, { transformOrigin: '0% 100%' });
        gsap.set(split.lines, { yPercent: 100, opacity: 0 });
        gsap.to(split.lines, { duration: 1, yPercent: 0, opacity: 1, stagger: 0.1, ease: 'power4.out', 
          scrollTrigger: { scroller: '.scroller', trigger: split.lines, start: 'top 90%', end: 'bottom 70%', scrub: true, id: 'sth2' }
        })  
        if (section.querySelector('p')) {
          let splitp = new SplitText(section.querySelectorAll('p'), { type: 'lines', linesClass: 'lineChildren' });
          gsap.set(splitp.lines, { transformOrigin: '0% 100%' });
          gsap.set(splitp.lines, { yPercent: 100, autoAlpha: 0 });
          gsap.to(splitp.lines, { duration: 1, yPercent: 0, autoAlpha: 1, stagger: 0.05, ease: 'power4.out', 
            scrollTrigger: { scroller: '.scroller', trigger: splitp.lines, start: 'top 80%', end: 'bottom 40%', scrub: true }
          })  
        }
      }
      if (section.querySelector('.cols-2')){
        gsap.set(section.querySelector('.cols-2'), { autoAlpha: 0 }); 
        gsap.to(section.querySelector('.cols-2'), { duration: 1, autoAlpha: 1, ease: 'power4.out', 
          scrollTrigger: { scroller: '.scroller', trigger: section.querySelector('.cols-2'), start: 'top 80%', end: 'bottom 40%', scrub: true }
        })
      }
    })
    canvasElems = Array.from(document.querySelectorAll('.lineChildren'));
  });

</script>

  <article class="scroller">
    <section class="splash"> 
      <h1>Simon Flöter creates products that stand out.</h1>
    </section>
    <section class="intro">
      <h2>As a Creative Web Developer ...</h2> 
      <div class="cols-2">
        <div>
          <p>I specialise in delivering beautifully crafted bespoke websites.</p> 
          <p>Averse to blindly following the latest tech trends, I put the experience of both my client and the product's audience first.</p>
        </div>
        <div>
          <p>I consult on the best suited technology and approach for every project and execute it.</p>
          <p>Whether it is pure HTML/CSS/Javascript, a 'monolithic' CMS like WordPress, a modern framework like React/Svelte, or a combination.</p>
        </div>
      </div>
      <div class="cta">
        <a href="/work" class="button">Learn More</a>
        <a href="/work" class="button button--primary">Hire Simon</a>
      </div>
    </section>
    <section class="more">
      <h2>As a UX & Graphic Designer...</h2> 
      <div class="cols-2">
        <div>
          <p>I worked for a wide range of clients, including Booking.com and Adidas, but also with startups and independent brands.</p>
        </div>
        <div>
          <p>I have designed Websites, Housestyles, Typefaces, Advertising campaigns and Print publications for them.</p>
        </div>
      </div>
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
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
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
    opacity: 0;
    margin: 0;
  }
  h1 {
    letter-spacing: -0.05em;
    line-height: .9;
    font-size: 17vw;
    margin-top: -.5em;
    text-align: center;
    @media screen and (min-width: 768px) {
      font-size: 12vw;
    }
  }
  h2 {
    font-size: 1.25em;
    margin-bottom: 1em;
  }
  .cols-2 {
    @media screen and (min-width: 768px) {
      margin: 0;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: .5em;
      border-top: 2px solid var(--color-text);
      margin-top: 0.125em;
      padding-top: 0.125em;
    }
  }
</style>