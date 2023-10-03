<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import ScrollTrigger from 'gsap/dist/ScrollTrigger';
  import SplitText from 'gsap/dist/SplitText';
  import Faq from '$lib/components/Faq.svelte';
  import ServiceCanvas from './ServiceCanvas.svelte';

  onMount( () => {  
    gsap.registerPlugin( ScrollTrigger, SplitText );
    
    let split = new SplitText('h1', { type: 'words', wordsClass: 'wordChildren' });

    let introTl = gsap.timeline({
     paused: true,
    });
    introTl.fromTo(split.words, {
      opacity: 0, scaleY: 0, yPercent: 100
    },{
      opacity: 1, scaleY: 1, yPercent: 0,
      transformOrigin: '50% 100%',
      duration: 1, ease: 'elastic.out(.75, .33)',
      stagger: 0.01,
    }, 1)

    introTl.play();

    // let trigger = ScrollTrigger.create({
    //   trigger: 'article',
    //   start: 'top top',
    //   end: '200px top',
    //   scrub: true,
    //   // markers: true,
    // })

    gsap.to('.services', {
      autoAlpha: 1,
      scrollTrigger: {
        trigger: 'article',
        start: 'top top',
        end: '200px top',
        scrub: true,
      }
    })
    gsap.to('h1 em', {
      autoAlpha: 0,
      yPercent: -100,
      scrollTrigger: {
        trigger: 'article',
        start: 'top top',
        end: '200px top',
        scrub: true,
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach( (trigger) => {
        trigger.kill();
      });
      gsap.killTweensOf('canvas');
      gsap.killTweensOf('h1');
      gsap.killTweensOf('section');
      gsap.killTweensOf('.services');
    }
  })
</script>

<ServiceCanvas />
<article>
  <h1>What I will do to earn a living<br><em>↓ Scroll down</em></h1>
  <div class="services">
    <section>
      <h2>Web Development</h2>
      <div class="service-content">
        <ul class="bullets">
          <li><em>Consultation</em> on the best technology solutions for your situation (eg CMS, frontend frameworks, etc)</li>
          <li><em>Advice</em> on how to enhance the user experience through savvy use of technology</li>
          <li><em>Development</em> in HTML/JS/CSS and/or whichever framework is best suited to your project</li>
          <a class="button" href="/contact">Get a quote</a>
        </ul>
        <div class="faqs">
          <h3>FAQs</h3>
          <Faq summary="What kind of websites do you create?">
            <p>I blend professionalism and creativity. My aim is simple: bring your ideas to life. My websites are often fun and bold and full of interesting interaction.</p> 
            <p>Projects include:</p>
            <ul>
              <li>Marketing websites</li>
              <li>E-commerce websites</li>
              <li>Mobile web apps</li>
              <li>Interactive online comics</li>
              <li>Browser games</li>
            </ul>
              
            <p>I center on crafting interfaces that dazzle visually and deliver an instinctive user journey. The essence is to make your users feel at home in the interaction with your content.</p>
            <p>Should your venture demand a backend touch, like managing databases or Content Management, I'm well-versed in leveraging existing open source solutions. I advocate for savvy fixes, seamlessly tailored to harmonize with your project.</p>
          </Faq>
          <Faq summary="What kind of websites do you <em>not</em> create?">
            <p>As a frontend developer, I'm not your guy for the intricate machinery that powers colossal enterprise web applications. Put simply, I can't whip up an Amazon or a TikTok from the ground up.</p>
            <p>Moreover, my moral code is steadfast. Requests involving, but not confined to, promoting weapons manufacturers or propagating conspiracy theories won't find a home with me. I must politely decline such propositions.</p>
          </Faq>
          <Faq summary="Which technologies and frameworks do you use/support?">
            <p>A web browser understands only HTML, CSS, and Javascript. Mastery of these is the bedrock for crafting top-notch web applications.</p>
            <p>Further, I've treaded diverse coding landscapes, navigating the realms of PHP, Perl, and Python. Among the myriad frameworks danced with, names like React, Svelte, Eleventy, Astro, and the esteemed Ruby on Rails echo.</p>
            <p>I serve as your counsel, steering you toward the optimal solution tailored to your project's idiosyncrasies.</p>
            <p>Should you possess a standing website, yearning for expansion, toss me the code, and we'll unravel the possibilities together. Not encountered a site I couldn't tame, so far.</p>
            <p>And, sometimes, the most fitting scaffold is none at all. I crafted some elegant, straightforward websites in the raw embrace of HTML, CSS, and JS.</p>
          </Faq>

          <Faq summary="Which Content Management System (CMS) do you recommend?">
            <p>I've tinkered with various Content Management Systems — the likes of WordPress, Strapi, Builder, Magento, and Shopify. Each carries its own set of virtues and vices.</p>
            <p>Let's talk about the folks responsible for constructing and upkeeping your content. Only then can we jointly discern the optimal solution.</p>
          </Faq>
        </div>
      </div>
      
    </section>
    <section>
      <h2>UX/Visual Design</h2>
      <div class="service-content">
        <ul class="bullets">
          <li><em>Concept & Mockup</em><br>In a collaborative effort we shall unearth the possibilities your brief holds. Then decide which road to follow down to </li>
          <li><em>Prototyping</em> for interactive products, to gain understanding of the user experience prior to production</li>
          <li><em>Illustration & animation</em> to bring your ideas to life</li>
          <li><em>Data visualisation</em> to aid crucial information cross the seas of abstraction</li>
        </ul>
        <div class="faqs">
          <h3>FAQs</h3>
          <Faq summary="What do you design?">
            <p>Primarily, I craft beautiful web experiences for my clients, aiming to seize their audience's imagination.</p>
            <p>I first was schooled in the art of graphic design. Over time, my focus shifted towards web projects, pulling me into the worlds of development and more UX/interaction-centric design.</p>
            <p>Beyond websites and user interfaces, I've crafted promotional posters and publications for print, as well as entire Housestyles for budding brands.</p>
            <p>And, well, I'm also an Illustrator, but that's a tale of its own. You can follow it <a href="https://instagram.com/floter.ink">on instagram</a>.</p>
          </Faq>
          <Faq summary="What do you NOT design?">
            <p>Despite doing animations for websites, mostly achieved through code, I am not a traditional motion designer. If you require a static video file as final product, you will want to look for someone with skills in video editing and motion design software such as After Effects.</p>
            <p>However it is easy to add animations made through such a process to a website and integrate them with the rest of the content.</p>
          </Faq>
          <Faq summary="What do you require to start designing?">
            <p>A good brief includes all limitations and aspirations of your project, your businesses proposition, values and intentions as well as any information you have on your target audience. References to competitors and examples of similar products you like are very helpful as well. Generally though, it all starts with a chat between you and yours truly.</p>
          </Faq>

        </div>
      </div>
    </section>
    <!-- <section>
      <h2>Full service</h2> 
      <div class="service-content">
        <ul class="bullets">
          <li><em>All of the above</em></li>
        </ul>
      </div>
    </section> -->
  </div>
</article>

<style lang="scss">
  article {
    margin: auto;
    max-width: 1200px;
    padding: calc(50vh - var(--spacing-outer) - 10vw) var(--spacing-outer) var(--spacing-outer) var(--spacing-outer);
    
    @media screen and (min-width: 768px) {
      padding: calc(50vh - var(--spacing-outer) - 6vw) var(--spacing-outer) var(--spacing-outer) var(--spacing-outer);
    }
  }
  h1 {
    position: relative;
    z-index: 3;
    font-size: 10vw;
    line-height: 1;

    & em {
      position: absolute;
      top: 120%;
      font-size: .4em;
      letter-spacing: -0.02em;
      font-style: normal;
      font-weight: 400;
      color: var(--color-text);
    }
    
    @media screen and (min-width: 768px) {
      font-size: 6vw;
      letter-spacing: -0.045em;
    }
  }
  .services {
    opacity: 0; //changed in ServiceCanvas
    padding-bottom: calc( 2 * var(--spacing-outer));
  }
  .service-content {
    
    @media screen and (min-width: 768px) {
      display: flex;
      gap: 1.5em;
    }
  }
  .service-content > :first-child {
    flex: 0 0 40%;
  }
  .service-content > *,
  .service-content > * > :first-child {
    @media screen and (min-width: 768px) {
      margin-top: 0;
      padding-top: 0;

    }
  }
  .faqs {
    margin-top: 2em;

    @media screen and (min-width: 768px) {
      margin-top: 0;
    }
  }
  h2 {
    border-bottom: 1px solid;
    padding-bottom: .5em;
    font-size: 1.5em;
    
    @media screen and (min-width: 768px) {
      font-size: 1.5em;
    }
  }
  h3 {
    font-size: 1.25em;

    @media screen and (min-width: 768px) {
      font-size: 1.5em;
    }
  }
  em {
    font-weight: 800;
    color: var(--color-highlight);
  }
  ul li {
    margin-bottom: .75em;
    line-height: 1.25;
  }
  li, p {
    font-size: 1em;
  }
  
</style>