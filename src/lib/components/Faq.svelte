<script lang="ts">
  import { onMount } from "svelte";
  import gsap from "gsap";
  export let summary: string;
  let details: HTMLElement;
  let contentHeight: number;
  let summaryHeight: number;

  onMount( () => {
    contentHeight = (details?.querySelector('.faq-content') as HTMLElement).offsetHeight;
    summaryHeight = (details?.querySelector('summary') as HTMLElement).offsetHeight;
    details.style.setProperty('--height', `${summaryHeight}px`);
    details.style.height = `var(--height)`;


    function resizeHandler() {
      contentHeight = (details?.querySelector('.faq-content') as HTMLElement).offsetHeight;
      summaryHeight = (details?.querySelector('summary') as HTMLElement).offsetHeight;
      if ( details?.hasAttribute('open') ) {
        details.style.setProperty('--height', `${contentHeight + summaryHeight}px`);
        details.style.height = `var(--height)`;
      } else {
        details.style.setProperty('--height', `${summaryHeight}px`);
        details.style.height = `var(--height)`;
      }
    }
    window.addEventListener('resize', resizeHandler );

    return () => {
      window.removeEventListener('resize', resizeHandler );
    }
  })

  function summaryClickHandler(e: Event){
    e.preventDefault();

    if ( details.hasAttribute('open') ) {
      gsap.to( details, {
        '--height': summaryHeight, duration: .4, ease: 'power4.out', overwrite: true,
        onComplete: () => {
          details.toggleAttribute('open')
        }
      })
    } else {
      details.toggleAttribute('open');
      contentHeight = (details?.querySelector('.faq-content') as HTMLElement).offsetHeight;
      let fullHeight =  contentHeight + summaryHeight;
      gsap.to( details, {
        '--height': fullHeight, duration: .5, ease: 'back.out(1)', overwrite: true
      })
      gsap.fromTo( details.querySelector('.faq-content'), {
        opacity: 0, x: -60
      }, {
        opacity: 1, x: 0, duration: .5, ease: 'power3.out', overwrite: true
      })
    }
  }


</script>

<details bind:this={details}>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <summary on:click={summaryClickHandler} on:keyup={summaryClickHandler}>{summary}</summary>
  <div class="faq-content">
    <slot />
  </div>
</details>

<style lang="scss">
  details {
    --height: 0;
    overflow: hidden;
    padding: 0;
    margin-bottom: 0;
    transition: margin-bottom .3s ease-out;
  }
  details[open] {
    margin-bottom: 1em;
  }
  summary {
    display: block;
    cursor: url('/pointer.svg'), auto;
    position: relative;
    z-index: 2;
    line-height: 1.2;
    font-size: 1em;
    padding: 0.5em 0 0.5em 1.5em;

    &:before, &:after {
      content: '';
      position: absolute;
      left: 0;
      top: 1em;
      width: 17px;
      height: 2px;
      background-color: var(--color-text);
      transform-origin: center;
      transition: transform .2s ease-in-out;
    }
    &:before {
      transform: rotate(90deg);
    }
  }
  details[open] summary {

    &::before {
      transform: rotate(0deg);
    }
  }
  .faq-content {
    border-left: 1px solid;
    margin-left: 8px;
    padding: 1em 0 0 calc(1.5em - 8px);
    position: relative;
    z-index: 1;
    font-size: 1em;
    box-sizing: border-box;
  }
  :global(.faq-content p, .faq-content li){
    font-size: 1em!important;
  }
  :global(.faq-content li){ 
    margin-left: 2em;
  }
  :global(.faq-content > :first-child){
    margin-top: 0;
  }
  :global(.faq-content > :last-child){
    margin-bottom: 0;
  }
</style>