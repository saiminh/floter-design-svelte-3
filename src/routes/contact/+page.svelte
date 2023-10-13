<script lang="ts">
  import { onMount } from 'svelte';
  import ContactCanvas from '$lib/components/ContactCanvas.svelte';
  import gsap from 'gsap';
  import SplitText from 'gsap/dist/SplitText';
  import ScrollTrigger from 'gsap/dist/ScrollTrigger';

  let canvasTexts: Array<HTMLElement> = [];
  let contactFormVisible = false;
  let contactFormClickHandler = (e: Event) => {
    if (contactFormVisible) {
      gsap.to('.wordChildren', { autoAlpha: 1, yPercent: 0, duration: 1, ease: 'power4.inOut' })
      gsap.to('.alternatives > *', { autoAlpha: 1, scale: 1, duration: .5, stagger: 0.1, ease: 'power4.inOut' })
      gsap.fromTo('.formwrapper', 
      { autoAlpha: 1, yPercent: 0 }, 
      { autoAlpha: 0, yPercent: 50, duration: .6, ease: 'power4.inOut', onComplete: () => {
        gsap.set('.formwrapper', { zIndex: -1 })
      } }
      )
    } else {
      gsap.to('.wordChildren', { autoAlpha: 1, yPercent: -100, duration: 1, ease: 'power4.inOut' })
      gsap.to('.alternatives > *', { autoAlpha: 0, scale: 0.5, duration: .5, stagger: 0.1, ease: 'power4.inOut' })
      gsap.set('.formwrapper', { zIndex: 2 })
      gsap.fromTo('.formwrapper', 
      { autoAlpha: 1, yPercent: 100 }, 
      { autoAlpha: 1, yPercent: 0, duration: 1, ease: 'power4.inOut' }
      )
      gsap.fromTo('.formwrapper label > *', 
      { autoAlpha: 0, yPercent: 100 }, 
      { autoAlpha: 1, yPercent: 0, duration: .5, stagger: 0.0125, ease: 'power4.out', delay: .25}
      )
    }
    contactFormVisible = !contactFormVisible;
  }

  onMount( () => {

    gsap.registerPlugin( SplitText, ScrollTrigger );
    
    let split = new SplitText('.toCanvas', { type: 'words, lines', wordsClass: 'wordChildren', linesClass: 'lineChildren' });
    
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

    canvasTexts = Array.from(document.querySelectorAll('.wordChildren'));

    const introInElem = document.querySelector('.pagewrapper') as HTMLElement;
    gsap.fromTo(introInElem.querySelectorAll('.wordChildren'), {
      autoAlpha: 0, yPercent: -100
    }, {
      autoAlpha: 1, yPercent: 0, duration: 1.5, stagger: 0.025, ease: 'power4.inOut',
    })
    gsap.fromTo(introInElem?.querySelectorAll('.alternatives p, .alternatives .button'), {
      autoAlpha: 0, yPercent: 100
    }, {
      autoAlpha: 1, yPercent: 0, duration: 1, stagger: 0.025, ease: 'power4.inOut',
    })

    return () => {
      gsap.killTweensOf('.toCanvas, .wordChildren');
    }
  })
</script>

<div class="pagewrapper">
  <div class="intro">
    <h1 class="toCanvas">Let's be strange,<br>not strangers.</h1>
    <div class="alternatives">
      <p>Choose your flavour of contact:</p>
      <ul>
        <li><span class="button button--primary" on:click={contactFormClickHandler} on:keydown={contactFormClickHandler} role="button" tabindex="0">Contact form</span></li>
        <li><a class="button" href="mailto:simon@floter.design">Email</a></li>
        <li><a class="button" href="https://www.linkedin.com/in/floter/">LinkedIn</a></li>
      </ul>
    </div>
  </div>
  <div class="formwrapper">
    <span class="button button-back" on:click={contactFormClickHandler} on:keydown={contactFormClickHandler} role="button" tabindex="0">← Back</span>
    <form name="contact" action="/success" method="POST" data-netlify="true">
      <input type="hidden" name="form-name" value="contact">
      <div class="inputs-flex-row">
        <label for="name">
          <!-- <p>How would you like to be addressed?</p> -->
          <input type="text" name="name" id="name" placeholder="Your name">
        </label>
        <label for="email">
          <!-- <p>For receiving a reply, add your Email address:</p> -->
          <input type="email" name="email" id="email" placeholder="Your Email?*" required>
        </label>
      </div>
      <label for="contact">
        <!-- <p>Please describe your plight in a few words</p> -->
        <textarea rows="8" name="contact" id="contact" placeholder="Your business propositions, praise, complaints and/or threats" required />
      </label>
      <div class="send">
        <button class="button button--xl button--primary" type="submit">Send it!</button>
      </div>
    </form>
  </div>
</div>
<ContactCanvas textsToCanvas={canvasTexts} />

<style lang="scss">
  h1 {
    visibility: hidden;
    font-size: 12vw;
    line-height: .9;
    letter-spacing: -0.04em;
    margin: 1em var(--spacing-nav) 1em var(--spacing-nav);
    
    @media screen and (min-width: 768px) {
      margin: 1em var(--spacing-outer) .75em var(--spacing-outer);
      font-size: 4.5em;
    }
  }
  .intro {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-bottom: 4em;
    @media screen and (min-width: 768px) {
      padding-bottom: 0;
    }
  }
  .formwrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: var(--spacing-outer) var(--spacing-outer) 4em var(--spacing-outer);
    background-color: var(--color-bg);
    z-index: 0;
    opacity: 0;
    visibility: hidden;
    overflow-y: scroll;

    --form-maxwidth: 1000px;
  }
  .button-back {
    margin: 0;
  }
  form {
    box-sizing: border-box;
    max-width: inherit;
    margin: 0 auto;
    overflow: hidden;
    padding: 1em 0;
  }
  .inputs-flex-row {
    @media screen and (min-width: 768px) {
      display: flex;
      gap: 1em;
      justify-content: center;
      max-width: var(--form-maxwidth);
      margin: auto;
  
      & label {
        flex-basis: 50%;
      }
    }
  }
  .alternatives {
    margin: 0em auto 1em auto; 
    width: 100%;
    text-align: center;
    
    @media screen and (min-width: 768px) {
      margin: 0 auto 2em auto; 
      padding-bottom: 1em;
    }
    & p, & .button {
      opacity: 0;
    }
    & p {
      font-size: 1.4em;
      margin: 0 0 .5em 0;
    }
    & ul {
      margin: 0 var(--spacing-outer);
      list-style-type: none;
      display: flex;
      justify-content: center;
      gap: .25em;
    }
    & ul li {
      display: block;
      margin: 0;
    }
    & .button {
      margin: 0.25em 0;
      display: block;
      font-size: .9em;

      @media screen and (min-width: 768px) {
        font-size: 1.2em;
      }
    }
  }
  label {
    font-size: 1em;
    @media screen and (min-width: 768px) {
      font-size: 1.25em;
    }
  }
  input[type='text'], input[type='email'], textarea {
    width: 100%;
    border: 0 solid var(--color-text);
    background-color: var(--color-text);//Overruled by placeholder-shown if no value
    color: var(--color-bg);
    border-radius: 4px;
    font-family: 'Stratos', sans-serif;
    font-size: 1em;
    line-height: 1.2;
    padding: .75em;
    transition: all 0.3s ease-out;
    margin: 0 auto 1em auto;
    display: block;
    max-width: var(--form-maxwidth);
    
    &:focus {
      outline: none;
      color: var(--color-bg);
      background-color: var(--color-text);
    }
    &:placeholder-shown {
      background-color: rgba(255, 255, 225, 0.2);
    }
    &:focus:placeholder-shown {
      background-color: var(--color-text);
    }
    &::placeholder {
      color: var(--color-text);
      opacity: .8;
    }
  }
  // label p {
  //   max-width: var(--form-maxwidth);
  //   margin: 0 auto 1em auto;
  //   display: block;
  //   font-size: .75em;
  //   margin-bottom: .5em;
  // }
  .send {
    max-width: var(--form-maxwidth);
    margin: auto;
  }
</style>