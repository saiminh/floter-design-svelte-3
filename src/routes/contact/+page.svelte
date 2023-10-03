<script lang="ts">
  import { onMount } from 'svelte';
  import ContactCanvas from '$lib/components/ContactCanvas.svelte';
  import gsap from 'gsap';
  import SplitText from 'gsap/dist/SplitText';
  import ScrollTrigger from 'gsap/dist/ScrollTrigger';

  export const prerender = true
  let canvasTexts: Array<HTMLElement> = [];

  onMount( () => {

    gsap.registerPlugin( SplitText, ScrollTrigger );

    
    let split = new SplitText('.toCanvas', { type: 'lines', linesClass: 'lineChildren' });
    
    let alignmiddles: Array<HTMLElement> = Array.from(document.querySelectorAll('.toCanvas'));
    alignmiddles.forEach( (toCanvas) => {
      let spanlengths: Array<number> = [];
      toCanvas.querySelectorAll('.lineChildren').forEach( (line) => {
        line.innerHTML = '<span>' + line.innerHTML + '</span>'
      })
      toCanvas.querySelectorAll('.lineChildren span').forEach( (span) => {
        spanlengths.push(span.getBoundingClientRect().width);
      })
      // get the longest spanlength
      let longestSpan = Math.max(...spanlengths);
      toCanvas.style.position = 'relative';
      toCanvas.style.left = (toCanvas.offsetWidth - longestSpan) / 2 + 'px';
    })

    canvasTexts = Array.from(document.querySelectorAll('.lineChildren'));

    const introIn = document.querySelector('.contact') as HTMLElement;
    gsap.fromTo(introIn.querySelectorAll('.lineChildren'), {
      opacity: 0, yPercent: -100
    }, {
      opacity: 1, yPercent: 0, duration: 1.5, stagger: 0.05, ease: 'power4.inOut',
    })
    gsap.fromTo(introIn?.querySelectorAll('p, input, .button'), {
      opacity: 0, yPercent: 100
    }, {
      opacity: 1, yPercent: 0, duration: 1, stagger: 0.05, ease: 'power4.inOut',
    })

    const scrollIns = document.querySelectorAll('.scrollIn');
    scrollIns.forEach( scrollIn => {
      gsap.set(scrollIn.querySelectorAll('p, input, textarea, .button'), { opacity: 0, y: 100 });
      gsap.to(scrollIn.querySelectorAll('p, input, textarea, .button'), { opacity: 1, y: 0, duration: 1, stagger: 0.05, ease: 'power4.inOut', 
        scrollTrigger: { trigger: scrollIn, start: 'top 66%', end: 'bottom 50%', scrub: false }
      })  
      gsap.fromTo(scrollIn.querySelectorAll('.lineChildren'), {
        opacity: 0, yPercent: 100
      },{
        opacity: 1, yPercent: 0, duration: 1, stagger: 0.05, ease: 'power4.inOut', 
        scrollTrigger: { trigger: scrollIn, start: 'top 66%', end: 'bottom 50%', scrub: false }
      })
    })

    let textarea = document.querySelector('textarea') as HTMLElement

    textarea?.addEventListener('focus', () => {
      window.scrollTo(0, textarea.offsetTop - 100);
    })
    
    return () => {
      gsap.killTweensOf('.toCanvas, .lineChildren');
    }
  })

</script>

<div class="formwrapper">
  <form name="contact" action="/success" method="POST" data-netlify="true" { ...{ 'netlify-honeypot': 'bot-field' } }>
    <input type="hidden" name="form-name" value="contact">
    <section class="contact">
      <h1 class="toCanvas">Don't be a stranger. Let's get acquainted.</h1>
      <div class="alternatives">
        <p>You can fill in the form below or:</p>
        <ul>
          <li><a class="button" href="mailto:simon@floter.design">Send an Email</a></li>
          <li><a class="button" href="https://www.linkedin.com/in/floter/">Connect on LinkedIn</a></li>
      </div>
      <label for="name">
        <p>How would you like to be addressed?</p>
        <input type="text" name="name" id="name" placeholder="Your name">
      </label>
      <label for="email">
        <p>For receiving a reply, add your Email address:</p>
        <input type="email" name="email" id="email" placeholder="Your Email?*" required>
      </label>
    </section>
    <section class="message scrollIn">
      <h3 class="toCanvas contactheadline">How can I assist in your noble cause?</h3>
      <label for="contact">
        <p>Please describe your plight in a few words</p>
        <textarea rows="6" name="contact" id="contact" />
      </label>
      <button class="button" type="submit">Send it!</button>
    </section>
  </form>
</div>
<ContactCanvas textsToCanvas={canvasTexts} />

<style lang="scss">
  h1, h3 {
    visibility: hidden;
    font-size: 2.5em;
    line-height: .9;
    letter-spacing: -0.04em;
    margin: 1em var(--spacing-nav) 1em var(--spacing-nav);
    
    @media screen and (min-width: 768px) {
      margin: 1em var(--spacing-outer) 0.33em var(--spacing-outer);
      font-size: 4.5em;
    }
  }
  h3 {
    font-size: 2em;
    @media screen and (min-width: 768px) {
      font-size: 3em;
    }
  }
  .contact p, .contact input {
    opacity: 0;
  }
  .formwrapper {
    margin: 0 auto;
    padding: 1em 1em calc(4 * var(--spacing-outer)) 1em;
  }
  form {
    box-sizing: border-box;
    max-width: inherit;
    margin: 0 auto;
    overflow: hidden;
  }
  .alternatives {
    margin: 4em auto 1em auto; 
    width: 100%;
    
    @media screen and (min-width: 768px) {
      margin: 0 auto 2em auto; 
      padding-bottom: 1em;
      max-width: 640px;
    }

    & p {
      margin: 0;
    }
    & ul {
      list-style-type: none;
      display: flex;
      gap: .5em;
      margin: 0;
    }
    & .button {
      margin-top: 0.5em;
    }
  }
  section {
    box-sizing: border-box;
    margin: 0;
    min-height: 70vh;
    
    @media screen and (min-width: 768px) {
      // display: flex;
      // flex-direction: column;
      // justify-content: center;
      max-width: 75vw;
      margin: 0 auto;
      gap: 0;      
    }
  }
  label {
    font-size: 1.25em;
  }
  input[type='text'], input[type='email'], textarea {
    width: 100%;
    border: 0px solid var(--color-text);
    background-color: rgba(255, 205, 205, 0.2);
    color: var(--color-text);
    border-radius: 4px;
    font-family: 'Stratos', sans-serif;
    font-size: 1em;
    padding: .75em;
    transition: all 0.3s ease-out;
    margin: 0 auto 1em auto;
    display: block;
    max-width: 640px;
    
    &:focus {
      outline: none;
      color: var(--color-bg);
      background-color: var(--color-text);
    }
    &::placeholder {
      color: var(--color-text);
      opacity: .7;
    }
  }
  label p {
    max-width: 640px;
    margin: 0 auto 1em auto;
    display: block;
    font-size: .75em;
    margin-bottom: .5em;
  }
  button {
    display: block;
    width: 100%;
    margin: 0 auto;
    font-size: 1.25em;
    max-width: 640px;
    opacity: 0;
  }
</style>